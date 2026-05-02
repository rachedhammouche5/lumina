import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

type AdminShellProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children: ReactNode;
  stats?: Array<{
    label: string;
    value: string;
    hint?: string;
  }>;
};

export default function AdminShell({
  title,
  description,
  eyebrow = "Admin workspace",
  children,
  stats = [],
}: AdminShellProps) {
  return (
    <section className="min-h-[calc(100vh-4.5rem)] mt-10 bg-linear-to-br from-slate-900 to-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <header className="rounded-[1.75rem] border border-white/10 bg-linear-to-br from-slate-900 via-slate-800 to-slatte-950 p-5 shadow-2xl shadow-slate-950 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200">
                  <ShieldCheck size={13} />
                  {eyebrow}
                </div>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {title}
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  {description}
                </p>
              </div>

            </div>
          </div>
        </header>

        {stats.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-white/10 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 p-4 shadow-slate-950"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-black text-white">{stat.value}</p>
                {stat.hint ? (
                  <p className="mt-1 text-xs leading-5 text-slate-400">{stat.hint}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        <div className="rounded-[1.75rem] border border-white/20 bg-linear-to-br from-slate-800 to-slate-950 p-4 shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-6">
          {children}
        </div>
      </div>
    </section>
  );
}
