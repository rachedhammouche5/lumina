import InfoCard from "@/app/ui/roadmapcomp/InfoCard";
import RoadmapFlow from "@/app/ui/roadmapcomp/RoadmapFlow";
import ProgressBar from "@/app/ui/roadmapcomp/ProgressBar";
import Button from "@/app/ui/Button";


export default function RoadmapPage() {
  return (
    <main className="min-h-screen min-w-screen bg-slate-950 text-white flex flex-col items-center pt-16 md:pt-20 px-4 sm:px-6 relative overflow-hidden font-sans gap-3">
      <div className="w-full justify-between flex flex-row pl-10 pr-10">
        <Button variant="outline" size="s" className="bg-linear-to-br from-slate-300/50 to-slate-500/10 border-2 border-slate-700/40"> {"<\t Back to courses"} </Button>
        <Button variant="outline" size="s" className="bg-linear-to-br from-slate-300/50 to-slate-500/10 border-2 border-slate-700/40"> {" Enroll"} </Button>
      </div>
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row gap-5 mb-8 md:mb-10">
        <div className="w-full md:flex-[2]">
          <InfoCard title="git master v1.0" subtitle="start learning team works and devlopments using tools like git " />
        </div>
        <div className="w-full md:flex-1">
          <ProgressBar title="Your Next Progres" value={40} />
        </div>
      </div>
      <div className="w-full max-w-[1400px]">
        <h3 className="text-xl md:text-2xl font-black italic tracking-tight mb-4">COURSE PATH</h3>
        <RoadmapFlow topics={[]} scores={[]} />
      </div>
    </main>
  );
}
