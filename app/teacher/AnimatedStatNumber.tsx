"use client";

import { useEffect, useMemo, useState } from "react";

export default function AnimatedStatNumber({
  value,
  durationMs = 900,
  suffix = "",
}: {
  value: number;
  durationMs?: number;
  suffix?: string;
}) {
  const safeValue = useMemo(() => Math.max(0, Math.floor(value)), [value]);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.max(1, Math.round(durationMs / 16));

    const timer = setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(safeValue * eased);
      setDisplayValue(next);

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [durationMs, safeValue]);

  return (
    <span className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}
