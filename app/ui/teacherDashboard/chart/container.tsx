
import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function ChartContainer({ title, subtitle, children }: Props) {
  return (
    <div className="relative w-full h-full bg-[#0a0f1d]/40 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 transition-all duration-700 hover:border-orange-500/20">
      <div className="flex flex-col mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{subtitle}</p>}
      </div>
      <div className="h-[300px] w-full">
        {children}
      </div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
}