export type TeacherRequestStatus = "pending" | "approved" | "rejected";

export type TeacherRequest = {
  email: string | null;
  full_name: string | null;
  user_id: string;
  photo_url: string | null;
  cv_url: string | null;
  gov_id_url: string | null;
  certification_url: string | null;
  motivation: string | null;
  status: TeacherRequestStatus;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  admin_note: string | null;
};

export type AdminUser = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
};

export type AdminTeacher = {
  id: string;
  full_name: string | null;
  email: string | null;
  photo_url: string | null;
  user_id: string | null;
};

export type AdminStudent = {
  id: string;
  full_name: string | null;
  email: string | null;
  level: "beginner" | "intermediate" | "advanced" | "master" | null;
  streak: number;
  last_active_date: string | null;
  photo_url: string | null;
  user_id: string | null;
};

export type AdminDashboardMetrics = {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  activeStudents7d: number;
  latestRequestAt: string | null;
  latestStudentActivityAt: string | null;
};
