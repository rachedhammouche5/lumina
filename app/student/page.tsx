import { requireStudentAccess } from "@/features/utils/auth/requireUserAccess";

export default async function StudentPage() {
  const { student } = await requireStudentAccess();

  return (
    <main className="min-h-screen px-4 pt-28 pb-24 flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-6 text-center">
        <h1 className="text-3xl font-bold">Welcome back, {student.std_fullname}</h1>
        <p className="text-slate-300">
          Your learning space is tied to your authenticated Supabase account.
        </p>
      </div>
    </main>
  );
}
