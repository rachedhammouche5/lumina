import RoadmapFlow, {
  DEFAULT_ROADMAP_CONNECTIONS,
  DEFAULT_ROADMAP_STEPS,
} from "@/app/ui/roadmapcomp/RoadmapFlow";
import { Star } from "lucide-react";

export default function RoadmapPage() {
  const progressPercent = 45;

  return (
    // 1. Main Background: Deep dark with overflow hidden for the glow effects
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center pt-20 px-6 relative overflow-hidden font-sans">
      
      {/* --- Ambient Background Magic (Deep Space Vibe) --- */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-6xl flex flex-col items-center justify-center relative z-10">
        
        {/* 2. Title Container (The Glass HUD) */}
        <div className="w-full flex items-center justify-between bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 mb-10 shadow-2xl">
          
          <div className="flex items-center gap-6">
            {/* Icon Container: Neon Glow Style */}
            <div className="h-16 w-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex justify-center items-center text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
              <Star size={28} strokeWidth={2.5} />
            </div>
            
            {/* Texts Container */}
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                  GIT MASTERY v1.0
                </h1>
                {/* Status Badge */}
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-cyan-500/20">
                  In Progress
                </span>
              </div>
              <p className="text-sm text-white/40 uppercase tracking-[0.2em] mt-2 font-medium">
                The Ultimate Version Control Architect Path lorem ipsum jifo fjos it eow bowed iap eqolo navira polosus 
              </p>
            </div>
          </div>
        </div>

        {/* 3. Progress Bar Section (Sleek & Minimal) */}
        <div className="w-full flex flex-col mb-12 px-4">
          <div className="flex justify-between items-end mb-4">
            <span className="text-sm font-semibold text-white/50 tracking-widest uppercase">
              Course Progress
            </span>
            <span className="text-2xl font-black italic text-orange-500 tracking-tighter">
              {progressPercent}%
            </span>
          </div>
          
          {/* The Track (Empty Bar) */}
          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
            {/* The Fill (Active Progress with Neon Glow) */}
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] relative"
              style={{ width: `${progressPercent}%` }}
            >
              {/* Highlight Spark on the edge */}
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/40 blur-[2px] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 4. Roadmap Container */}
        <div className="w-full h-[70vh] mb-20">
          <RoadmapFlow
            steps={DEFAULT_ROADMAP_STEPS}
            connections={DEFAULT_ROADMAP_CONNECTIONS}
          />
        </div>
        
      </div>
    </main>
  );
}
