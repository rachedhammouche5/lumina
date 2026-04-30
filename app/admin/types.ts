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
};

export type AdminUser = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
};
