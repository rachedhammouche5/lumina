"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const progressData = [
  { week: "Week 1", score: 58 },
  { week: "Week 2", score: 63 },
  { week: "Week 3", score: 70 },
  { week: "Week 4", score: 76 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#1e293b",
        border: "1px solid rgba(99,102,241,0.3)",
        borderRadius: 12,
        padding: "8px 14px",
      }}
    >
      <p style={{ color: "#64748b", fontSize: 11, marginBottom: 2 }}>{label}</p>
      <p style={{ color: "#a5b4fc", fontSize: 15, fontWeight: 700 }}>
        {payload[0].value}%
      </p>
    </div>
  );
};

export default function ProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={progressData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
        <XAxis
          dataKey="week"
          tick={{ fill: "#64748b", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[40, 100]}
          tick={{ fill: "#64748b", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          tickCount={4}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(99,102,241,0.2)", strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="score"
          stroke="url(#lineGradient)"
          strokeWidth={2.5}
          fill="url(#areaGradient)"
          dot={{ fill: "#818cf8", r: 4, strokeWidth: 0 }}
          activeDot={{ fill: "#a5b4fc", r: 6, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}