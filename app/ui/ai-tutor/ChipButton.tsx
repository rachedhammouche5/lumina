import { useState } from "react";

export default function ChipButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-150 whitespace-nowrap font-[DM_Sans] cursor-pointer ${
        hovered
          ? "border-[#e8720c] text-[#e8720c] bg-[rgba(232,114,12,0.08)]"
          : "border-white/[0.09] text-[#7c83a0] bg-white/[0.03]"
      }`}
    >
      {label}
    </button>
  );
}