import { requireTeacherAccess } from "@/features/utils/auth/requireUserAccess";

export default async function TeacherPage() {
  const { teacher } = await requireTeacherAccess();

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-white">
        Welcome, {teacher.tchr_fullname}
      </h2>
      <p className="text-slate-300">
        Use the sidebar to navigate to your teaching tools.
      </p>
    </div>
  );
}
