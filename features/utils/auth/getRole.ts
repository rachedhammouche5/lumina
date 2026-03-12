export type Role = "student" | "teacher" | "teacher_pending" | "admin" | null;
type UserWithRoleMetadata = {
  app_metadata?: Record<string, unknown> | null;
};

function isRole(value: unknown): value is Exclude<Role, null> {
  return (
    value === "student" ||
    value === "teacher" ||
    value === "teacher_pending" ||
    value === "admin"
  );
}

export function getRole(user: UserWithRoleMetadata | null | undefined): Role {
  const role = user?.app_metadata?.role;
  return isRole(role) ? role : null;
}
