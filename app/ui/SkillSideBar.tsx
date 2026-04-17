import { createClient } from "@/lib/supabase/server";
import Button from "./Button";
import { Plus, Trash } from "lucide-react";
import Link from "next/link";

export default async function SkillSideBar() {
    const supabase = await createClient()
    const {data : { user }} = await supabase.auth.getUser();
    if (!user) {return (<div className="w-[280px] shrink-0 rounded-lg border border-slate-700/50 bg-[#0a0c14]/50 p-4">
        <h2 className="text-lg font-semibold">We didnt find anyskill </h2>
        <p className="text-sm text-slate-400 mt-2">
            if you uploaded a skill, make sure you are logged in with the correct account. If the problem persists, please contact support.
        </p>
        </div>)}

        const { data: teacher } = await supabase
        .from("Teacher")
        .select("tchr_id")
        .eq("user_id", user.id)
        .single();

        const { data: skills } = await supabase
        .from("Skill")
        .select("*")
        .eq("teacher_id", teacher?.tchr_id);

        const skillTable : skill[] = skills ?? [];


    return (
        <div className=" shrink-0 border border-slate-700/50 bg-linear-to-br from-slate-600/40 to-slate-950 p-4 w-full h-full">
            <div className="flex items-center justify-between mb-4 px-4 mb-10">
                <div className="flex flex-row justify-between items-center w-full py-6 border-b border-slate-700">
                    <h2 className="text-xl font-semibold uppercase">Skill library</h2>
                    <Button variant="outline" size="s" href="/teacher/skills/new" className="text-sm mt-2">
                        <div>
                            <Plus   size={16} />
                        </div>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col w-full">
                {skillTable.length === 0 ? (
                    <p className="text-sm text-slate-400">You haven't created any skills yet. Click the "Add Skill" button to get started.</p>
                ) : (
                    skillTable.map((skill) => (
                        
                        <Link key={skill.skl_id} href={`/teacher/skills/${skill.skl_id}`} className=" w-full flex items-center text-left justify-start p-4 border-b border-slate-700 rounded-lg gap-2 hover:bg-slate-700/30 active:bg-slate-700/30 transition">
                            <div className="w-16 h-16 flex-shrink-0">
                                {skill.skl_picture ? (
                                    <img
                                        src={skill.skl_picture}
                                        alt={skill.skl_title}
                                        className="w-16 h-16 object-cover rounded-md mr-4"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-slate-700 rounded-md mr-4 flex items-center justify-center">
                                        <span className="text-sm text-slate-400">No Image</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">

                            </div>
                            <div className="text-left w-[]">
                                <h5 className="text-sm font-semibold text-slate-300">{skill.skl_title}</h5>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <button
                                    className="text-white bg-red-600 h-10 w-10 rounded-2xl flex flex-col items-center justify-center hover:text-red-950 hover:bg-red-400 hover:cursor-pointer  transition"
                                >
                                    <Trash size={20} />
                                </button>

                            </div>
                            
                        </Link>
                    ))
                )}
            </div>

        </div>
    );
    }