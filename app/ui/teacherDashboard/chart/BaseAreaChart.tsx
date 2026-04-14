"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

type ChartPoint = {
  name: string;
  students: number;
  likes: number;
  comments: number;
  interactions: number;
};

type ChartInput = Partial<ChartPoint> & {
  date?: string;
  label?: string;
};

const demoData: ChartPoint[] = [
  { name: "Mon", students: 12, likes: 8, comments: 3, interactions: 11 },
  { name: "Tue", students: 18, likes: 10, comments: 4, interactions: 14 },
  { name: "Wed", students: 15, likes: 13, comments: 5, interactions: 18 },
  { name: "Thu", students: 26, likes: 16, comments: 7, interactions: 23 },
  { name: "Fri", students: 22, likes: 14, comments: 6, interactions: 20 },
  { name: "Sat", students: 31, likes: 20, comments: 9, interactions: 29 },
  { name: "Sun", students: 28, likes: 18, comments: 8, interactions: 26 },
];

const seriesConfig = [
  { key: "students", label: "Students", color: "#f97316", strokeOp: 1, strokeW: 2.5, fillOp: 0.45 },
  { key: "likes", label: "Likes", color: "#38bdf8", strokeOp: 0.75, strokeW: 1.8, fillOp: 0.3 },
  { key: "comments", label: "Comments", color: "#a78bfa", strokeOp: 0.7, strokeW: 1.5, fillOp: 0.18 },
  { key: "interactions", label: "Interactions", color: "#22c55e", strokeOp: 0.65, strokeW: 1.5, fillOp: 0.1 },
] as const;

export default function BaseAreaChart({ data }: { data?: ChartInput[] }) {
  const chartData: ChartPoint[] = (data?.length ? data : demoData).map((item) => ({
    name: item?.name ?? item?.date ?? item?.label ?? "Day",
    students: Number(item?.students ?? 0),
    likes: Number(item?.likes ?? 0),
    comments: Number(item?.comments ?? 0),
    interactions: Number(item?.interactions ?? 0),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          {seriesConfig.map((s) => (
            <linearGradient key={`grad-${s.key}`} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color} stopOpacity={s.fillOp} />
              <stop offset="95%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }} 
          dy={10} 
        />
        <YAxis hide={true} />

        <Tooltip
          contentStyle={{ 
            backgroundColor: '#0f172a', 
            border: '1px solid rgba(250, 113, 0, 0.1)', 
            borderRadius: '12px' 
          }}
          itemStyle={{ fontSize: '12px' }}
        />
        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />

        {seriesConfig.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={s.strokeW}
            strokeOpacity={s.strokeOp}
            fill={`url(#grad-${s.key})`}
            fillOpacity={1} // Handled by the gradient stops
            activeDot={{ r: 4, strokeWidth: 0, fill: s.color }}
            animationDuration={1500}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
