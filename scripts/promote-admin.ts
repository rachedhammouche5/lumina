import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const targetEmail = process.argv[2] || process.env.E2E_ADMIN_EMAIL;

if (!targetEmail) {
  console.error("Usage: pnpm exec tsx scripts/promote-admin.ts <email>");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const { data, error } = await supabase.auth.admin.listUsers({
  page: 1,
  perPage: 200,
});

if (error) {
  console.error("Failed to list users:", error.message);
  process.exit(1);
}

const user = data?.users?.find(
  (item) => item.email?.toLowerCase() === targetEmail.toLowerCase(),
);

if (!user) {
  console.error(`No user found for ${targetEmail}.`);
  process.exit(1);
}

const { error: updateError } = await supabase.auth.admin.updateUserById(
  user.id,
  {
    app_metadata: {
      ...(user.app_metadata ?? {}),
      role: "admin",
    },
  },
);

if (updateError) {
  console.error("Failed to promote user:", updateError.message);
  process.exit(1);
}

console.log(`Promoted ${targetEmail} to admin.`);
