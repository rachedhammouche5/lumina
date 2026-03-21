import Button from "@/app/ui/Button";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ student_id: string }>;
}) {
  const { student_id } = await params;

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-white shadow-[0_25px_80px_rgba(2,6,23,0.55)]">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
          Student space
        </p>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          Welcome back to your learning dashboard.
        </h1>
        <p className="max-w-2xl text-slate-300">
          Continue exploring skills, open your current roadmap, and manage your
          enrollments from one place.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button href={`/${student_id}/skills`}>Explore skills</Button>
        <Button href="/ai-tutor" variant="outline">
          Open AI tutor
        </Button>
      </div>
    </section>
  );
}
