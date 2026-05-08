
import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function ChartContainer({ title, subtitle, children }: Props) {
  return (
    <div className="relative h-full w-full rounded-[2rem] border border-slate-700/80 bg-slate-950/40 p-4 backdrop-blur-3xl transition-all duration-700 hover:border-orange-500/20 sm:rounded-[2.5rem] sm:p-6 lg:p-8">
      <div className="mb-5 flex flex-col sm:mb-8">
        <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">{title}</h3>
        {subtitle && <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-500 sm:text-xs">{subtitle}</p>}
      </div>
      <div className="h-[240px] w-full sm:h-[280px] lg:h-[320px]">
        {children}
      </div>
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-orange-500/5 blur-[80px]" />
    </div>
  );
}
