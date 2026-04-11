import { createClient } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";
import { getRole } from "../../../features/utils/auth/getRole";
import AdminUsersSection from "../_components/AdminUsersSection";
import type { AdminUser } from "../types";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export default async function UsersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const role = getRole(user);
  if (role !== "admin") redirect("/");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminClient =
    supabaseUrl && serviceRoleKey
      ? createAdminClient(supabaseUrl, serviceRoleKey)
      : null;

  let usersErrorMessage: string | null = null;
  let usersTotal: number | null = null;
  let users: AdminUser[] = [];

  if (!adminClient) {
    usersErrorMessage = "Missing Supabase configuration for admin tools.";
  } else {
    const { data: usersData, error: usersError } =
      await adminClient.auth.admin.listUsers({ page: 1, perPage: 200 });

    if (usersError) {
      usersErrorMessage = usersError.message;
    } else {
      const authUsers = usersData?.users ?? [];
      usersTotal = usersData?.total ?? authUsers.length;

      users = authUsers
        .filter((authUser) => {
          const isAnonymous = (authUser as { is_anonymous?: boolean })
            .is_anonymous;
          return !isAnonymous;
        })
        .map((authUser) => {
          const metadata = authUser.user_metadata as
            | { full_name?: string; name?: string }
            | null;
          const appMetadata = authUser.app_metadata as { role?: string } | null;
          const fullName =
            (typeof metadata?.full_name === "string" &&
              metadata.full_name.trim()) ||
            (typeof metadata?.name === "string" && metadata.name.trim()) ||
            null;
          const roleValue =
            getRole(authUser) ??
            (typeof appMetadata?.role === "string" ? appMetadata.role : null);

          return {
            id: authUser.id,
            email: authUser.email ?? null,
            full_name: fullName,
            role: roleValue,
            created_at: authUser.created_at ?? null,
          };
        })
        .sort((a, b) =>
          (b.created_at ?? "").localeCompare(a.created_at ?? ""),
        );
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-24 px-4">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-sm text-slate-300">
            Browse all registered users and manage their roles and permissions.
          </p>
        </header>

        <AdminUsersSection
          users={users}
          totalUsers={usersTotal}
          errorMessage={usersErrorMessage}
          currentUserId={user.id}
        />
      </div>
    </main>
  );
}