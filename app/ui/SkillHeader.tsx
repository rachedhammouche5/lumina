"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Clock3, Star } from "lucide-react";
import { Skill } from "@/lib/database.types";

export default function SkillHeader({
  data: skill,
  actions,
}: {
  data: Skill;
  actions?: ReactNode;
}) {
  if (!skill) return null;

  return (
    <section className="rounded-3xl border border-slate-700/70 bg-gradient-to-br from-slate-700 via-slate-950 to-transparent p-4 shadow-xl shadow-black/30 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 sm:h-24 sm:w-24">
            {skill.skl_picture ? (
              <Image src={skill.skl_picture} alt={skill.skl_title} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-400">
                No image
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold text-white sm:text-3xl">{skill.skl_title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {skill.skl_dscrptn || "No description provided yet."}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange-200 sm:px-3 sm:py-1.5 sm:text-xs">
                <Clock3 size={14} />
                {skill.skl_duration || "N/A"}h duration
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-100 sm:px-3 sm:py-1.5 sm:text-xs">
                <Star size={14} />
                N/A rating
              </div>
            </div>
          </div>
        </div>

        {actions ? <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">{actions}</div> : null}
      </div>
    </section>
  );
}
