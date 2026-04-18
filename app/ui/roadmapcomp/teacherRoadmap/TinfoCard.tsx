import { Projector, LucideIcon, GitBranch } from "lucide-react";

interface InfoCardProps {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
}

function TInfoCard({ title, subtitle, icon: Icon = GitBranch }: InfoCardProps) {
  return (
    <div
      className="
        flex flex-row items-center
        h-auto md:h-48 w-full
        border border-orange-200/50 rounded-[32px]
        p-5 md:p-6
        bg-gradient-to-br from-orange-200/20 via-transparent to-transparent
        backdrop-blur-xl
        overflow-hidden
        gap-6
        relative
        shadow-2xl
        shadow-orange-300/30
        group
      "
    >
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/20 blur-[60px] rounded-full pointer-events-none" />

      <div className="flex flex-col h-full justify-center flex-1 min-w-0 z-10">
        <h2 className="font-black italic text-2xl md:text-3xl uppercase tracking-tighter leading-[1.1] line-clamp-2 text-white shadow-orange-500/50 drop-shadow-sm">
          {title}
        </h2>

        <div className="h-[1px] w-3/4 bg-gradient-to-r from-orange-400/80 to-transparent my-4 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />

        <p className="font-medium text-white/70 text-[11px] md:text-sm leading-relaxed tracking-tight line-clamp-3 break-words">
          {subtitle}
        </p>
      </div>

      <div className="flex-shrink-0 z-10">
        <div
          className="
            h-24 w-24 md:h-32 md:w-32
            rounded-2xl justify-center items-center flex
            bg-orange-300/10 border border-orange-200/20
            shadow-[0_0_30px_rgba(249,115,22,0.2)]
            transition-all duration-500
          "
        >
          <Icon size={48} className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
