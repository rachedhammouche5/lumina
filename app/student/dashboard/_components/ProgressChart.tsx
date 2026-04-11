"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer
} from "recharts";

const progressData = [
  { week: "Week 1", score: 58 },
  { week: "Week 2", score: 63 },
  { week: "Week 3", score: 70 },
  { week: "Week 4", score: 76 },
];

export default function ProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={progressData}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis domain={[30, 100]} tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13 }}>
                <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{label}</p>
                <p style={{ color: "#60a5fa", fontWeight: 700 }}>{payload[0].value}%</p>
              </div>
            );
          }}
        />
        <ReferenceLine y={75} stroke="#86efac" strokeDasharray="6 4" label={{ value: "Goal", fill: "#86efac", fontSize: 11 }} />
        <Line type="monotone" dataKey="score" stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#60a5fa", r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}