import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import ProfileClient from "./ProfileClient";

function toTitleCase(value: string) {
  return value
    .split(/[_\s-]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const role = getRole(user);
  const fallbackName =
    (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
    (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
    (typeof user.email === "string" && user.email.split("@")[0]) ||
    "User";
  const fallbackEmail = user.email ?? "Unknown email";
  const fallbackAvatar =
    (typeof user.user_metadata?.avatar_url === "string" && user.user_metadata.avatar_url) ||
    (typeof user.user_metadata?.picture === "string" && user.user_metadata.picture) ||
    null;

  let name = fallbackName;
  let email = fallbackEmail;
  let avatarUrl: string | null = fallbackAvatar;
  let level: string | null = null;

  if (role === "student") {
    const { data: student, error: studentError } = await supabase
      .from("Student")
      .select("std_fullname, std_email, std_level, std_pfp")
      .eq("std_id", user.id)
      .maybeSingle();

    if (studentError) {
      console.error("[profile] Failed to load student profile:", studentError.message);
    }

    name = student?.std_fullname ?? name;
    email = student?.std_email ?? email;
    avatarUrl = student?.std_pfp ?? avatarUrl;
    level = student?.std_level ?? null;
  }

  if (role === "teacher" || role === "teacher_pending") {
    const { data: teacher, error: teacherError } = await supabase
      .from("Teacher")
      .select("tchr_fullname, tchr_email, tchr_pfp")
      .eq("tchr_id", user.id)
      .maybeSingle();

    if (teacherError) {
      console.error("[profile] Failed to load teacher profile:", teacherError.message);
    }

    name = teacher?.tchr_fullname ?? name;
    email = teacher?.tchr_email ?? email;
    avatarUrl = teacher?.tchr_pfp ?? avatarUrl;
  }

  const roleLabel = role ? toTitleCase(role) : "User";
  const levelLabel = level ? toTitleCase(level) : null;

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 text-white">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <header className="space-y-2">
            <h1 className="text-xl
             uppercase tracking-[0.3em] text-white/50">Profile</h1>
          <p className="text-white/70">Manage your profile details and security settings.</p>
        </header>

        <ProfileClient
          name={name}
          email={email}
          avatarUrl={avatarUrl}
          level={levelLabel}
          roleLabel={roleLabel}
          role={role}
          userId={user.id}
        />
      </div>
    </main>
  );
}
