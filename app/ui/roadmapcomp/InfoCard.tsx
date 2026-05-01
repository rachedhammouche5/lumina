import { GitBranch, LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
}

function InfoCard({ title, subtitle, icon: Icon = GitBranch }: InfoCardProps) {
  return (
    <div className="relative flex h-auto md:h-48 w-full items-center gap-6 overflow-hidden rounded-3xl border border-orange-400/20 bg-gradient-to-br from-orange-500/10 via-slate-900 to-slate-950 p-5 md:p-7 shadow-xl shadow-black/30">
      <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-orange-500/15 blur-[60px]" />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-3">
        <h2 className="line-clamp-2 text-2xl font-bold leading-tight text-white md:text-3xl">
          {title}
        </h2>
        <div className="h-px w-16 bg-gradient-to-r from-orange-400 to-transparent" />
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 shadow-lg shadow-orange-500/10 md:h-28 md:w-28">
        <Icon size={40} className="text-orange-400" />
      </div>
    </div>
  );
}

export default InfoCard;
