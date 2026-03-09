export type Role = "student" | "teacher" | "teacher_pending" | "admin" | null;
type UserWithRoleMetadata = {
  app_metadata?: {
    role?: Role;
  };
};
export function getRole(user:UserWithRoleMetadata |null|undefined):Role{
    return user?.app_metadata?.role ?? null;
}
