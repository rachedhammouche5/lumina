export default function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 animate-pulse">
      <div className="h-5 w-2/3 rounded bg-slate-700/60" />
      <div className="mt-3 h-4 w-full rounded bg-slate-700/40" />
      <div className="mt-2 h-4 w-5/6 rounded bg-slate-700/40" />
      <div className="mt-6 h-9 w-24 rounded-full bg-slate-700/50" />
    </div>
  );
}
