import { User, Flame, Star } from "lucide-react";

export default function GeneralCards({ stats }: { stats: { totalStudents: number, avgRating: number, countStreak: number } }) {
    const cardsData = [
        { 
            title: "Total Students", 
            value: stats.totalStudents, 
            icon: User, 
            textColor: "text-orange-300", 
            borderClass: "border-orange-500/20",
        },
        { 
            title: "Average Rating", 
            value: stats.avgRating, 
            icon: Star, 
            textColor: "text-cyan-300", 
            borderClass: "border-cyan-400/20",
        },
        { 
            title: "Streak", 
            value: stats.countStreak, 
            icon: Flame, 
            textColor: "text-amber-300", 
            borderClass: "border-amber-500/20",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cardsData.map((card, index) => (
                <div key={index} className={`rounded-2xl border ${card.borderClass} bg-linear-to-br from-slate-600 via-slate-950 to-transparent p-4 shadow-2xl shadow-slate-900/30 sm:p-5`}>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{card.title}</p>
                    <div className="mt-3 flex items-end justify-between gap-4">
                        <div>
                            <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                {card.value}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">Live teacher metric</p>
                        </div>
                        <card.icon className={`h-6 w-6 ${card.textColor} sm:h-7 sm:w-7`} />
                    </div>
                </div>
            ))}
        </div>
    );
}
