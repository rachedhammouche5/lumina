import { User, Flame, Star } from "lucide-react";

export default function GeneralCards({ stats }: { stats: { totalStudents: number, avgRating: number, countStreak: number } }) {
    const cardsData = [
        { 
            title: "Total Students", 
            value: stats.totalStudents, 
            icon: User, 
            textColor: "text-orange-500", 
            baseGlow: "from-orange-500/10",
            hoverGlow: "group-hover:from-orange-500/20",
            borderClass: "border-orange-500/20 group-hover:border-orange-500/50"
        },
        { 
            title: "Average Rating", 
            value: stats.avgRating, 
            icon: Star, 
            textColor: "text-cyan-400", 
            baseGlow: "from-cyan-400/10",
            hoverGlow: "group-hover:from-cyan-400/20",
            borderClass: "border-cyan-400/20 group-hover:border-cyan-400/50"
        },
        { 
            title: "Streak", 
            value: stats.countStreak, 
            icon: Flame, 
            textColor: "text-orange-600", 
            baseGlow: "from-orange-600/10",
            hoverGlow: "group-hover:from-orange-600/20",
            borderClass: "border-orange-600/20 group-hover:border-orange-600/50"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cardsData.map((card, index) => (
                <div key={index} className="group relative">
                    

                    <div className={`absolute inset-0 bg-gradient-to-br ${card.baseGlow} to-transparent rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-700`} />

                    <div className={`
                        relative h-44 p-6 rounded-[2rem] overflow-hidden
                        flex flex-col items-center justify-center
                        bg-[#020617]/40 backdrop-blur-3xl
                        border ${card.borderClass}
                        transition-all duration-700
                        group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]
                    `}>
                        

                        <div className={`absolute inset-0 bg-gradient-to-tr ${card.baseGlow} ${card.hoverGlow} to-transparent transition-all duration-700`} />


                        <p className="absolute top-5 left-6 text-[10px] uppercase tracking-[0.3em] text-slate-400/60 font-bold z-10">
                            {card.title}
                        </p>


                        <div className="flex flex-row items-center gap-4 z-10">
                            <card.icon className={`w-14 h-14 ${card.textColor} transition-all duration-700 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`} />
                            <h3 className="text-5xl font-black text-white tracking-tight drop-shadow-md">
                                {card.value}
                            </h3>
                        </div>


                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shine_1.5s_ease-in-out]" />
                    </div>
                </div>
            ))}
        </div>
    );
}