import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getRole, type Role } from "@/features/utils/auth/getRole";
import type { Database } from "@/lib/database.types";

type StudentRow = Database["public"]["Tables"]["Student"]["Row"];
type TeacherRow = Database["public"]["Tables"]["Teacher"]["Row"];

type AuthenticatedUser = {
  id: string;
  email?: string | null;
  app_metadata?: Record<string, unknown> | null;
};

async function getAuthenticatedUser(redirectTo = "/") {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Auth error:", error.message);
    redirect(redirectTo);
  }

  if (!user) {
    redirect(redirectTo);
  }

  return { supabase, user: user as AuthenticatedUser };
}

async function getStudentProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Student")
    .select("*")
    .or(`user_id.eq.${userId},std_id.eq.${userId}`)
    .maybeSingle();

  if (error) {
    console.error("Student lookup error:", error.message);
    return null;
  }

  return data;
}

async function getTeacherProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Teacher")
    .select("*")
    .or(`user_id.eq.${userId},tchr_id.eq.${userId}`)
    .maybeSingle();

  if (error) {
    console.error("Teacher lookup error:", error.message);
    return null;
  }

  return data;
}

export async function requireAuthenticatedUser(redirectTo = "/") {
  return getAuthenticatedUser(redirectTo);
}

export async function requireStudentAccess(options?: {
  routeUserId?: string;
  redirectTo?: string;
}) {
  const redirectTo = options?.redirectTo ?? "/";
  const { supabase, user } = await getAuthenticatedUser(redirectTo);
  const role = getRole(user);

  if (role !== "student") {
    redirect(redirectTo);
  }

  const student = await getStudentProfile(user.id);
  if (!student) {
    redirect(redirectTo);
  }

  const canonicalUserId = user.id;
  if (options?.routeUserId && options.routeUserId !== canonicalUserId) {
    redirect(`/${canonicalUserId}`);
  }

  return {
    supabase,
    user,
    role,
    student,
    userId: canonicalUserId,
    studentId: student.std_id,
  };
}

export async function requireTeacherAccess(options?: {
  routeUserId?: string;
  redirectTo?: string;
}) {
  const redirectTo = options?.redirectTo ?? "/";
  const { supabase, user } = await getAuthenticatedUser(redirectTo);
  const role = getRole(user);

  if (role !== "teacher" && role !== "teacher_pending") {
    redirect(redirectTo);
  }

  const teacher = await getTeacherProfile(user.id);
  if (!teacher) {
    redirect(redirectTo);
  }

  const canonicalUserId = user.id;
  if (options?.routeUserId && options.routeUserId !== canonicalUserId) {
    redirect(`/${canonicalUserId}`);
  }

  return {
    supabase,
    user,
    role,
    teacher,
    userId: canonicalUserId,
    teacherId: teacher.tchr_id,
  };
}

export async function requireApprovedTeacherAccess(options?: {
  routeUserId?: string;
  redirectTo?: string;
}) {
  const access = await requireTeacherAccess(options);

  if (access.role !== "teacher") {
    redirect(options?.redirectTo ?? "/");
  }

  return access;
}

export async function getSkillsAccessContext(): Promise<
  | {
      role: Role;
      userId: string;
      student: StudentRow;
      studentId: string;
      canTrackProgress: true;
      canEnroll: true;
    }
  | {
      role: Role;
      userId: string;
      teacher: TeacherRow;
      teacherId: string;
      canTrackProgress: false;
      canEnroll: false;
    }
  | {
      role: null;
      userId: null;
      canTrackProgress: false;
      canEnroll: false;
    }
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      role: null,
      userId: null,
      canTrackProgress: false,
      canEnroll: false,
    };
  }

  const role = getRole(user);

  if (role === "student") {
    const student = await getStudentProfile(user.id);
    if (student) {
      return {
        role,
        userId: user.id,
        student,
        studentId: student.std_id,
        canTrackProgress: true,
        canEnroll: true,
      };
    }
  }

  if (role === "teacher" || role === "teacher_pending") {
    const teacher = await getTeacherProfile(user.id);
    if (teacher) {
      return {
        role,
        userId: user.id,
        teacher,
        teacherId: teacher.tchr_id,
        canTrackProgress: false,
        canEnroll: false,
      };
    }
  }

  return {
    role: null,
    userId: null,
    canTrackProgress: false,
    canEnroll: false,
  };
}
