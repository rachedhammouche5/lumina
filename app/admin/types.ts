export type TeacherRequestStatus = "pending" | "approved" | "rejected";

export type TeacherRequest = {
  user_id: string;
  email: string | null;
  full_name: string | null;
  cv_url: string | null;
  motivation: string | null;
  status: TeacherRequestStatus;
  created_at: string;
};
