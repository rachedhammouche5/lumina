import React from "react";
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, icon: Icon, iconColor = "text-white" }) => {
  return (
    // ✨ جرب تزيد 'transition-transform' صراحة
    <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-6 items-center gap-4 transition-all duration-300 transform hover:-translate-y-1 hover:border-slate-600 hover:shadow-lg hover:shadow-sky-500/10">
      
      {Icon && (
        <div className="size-12 flex items-center justify-center rounded-lg bg-slate-800 shrink-0">
          <Icon className={`size-6 ${iconColor}`} strokeWidth={1.5} />
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Card;