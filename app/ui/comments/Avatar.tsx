// components/comments/Avatar.tsx
export default function Avatar({ src, initials = "U", color = 'orange' }: { src?: string | null, initials?: string, color?: string }) {
  const colors: Record<string, string> = {
    orange: 'bg-orange-500/20 text-orange-500',
    purple: 'bg-purple-500/20 text-purple-500',
    teal: 'bg-teal-500/20 text-teal-500',
  }

  if (src) {
    return <img src={src} className="w-9 h-9 rounded-full object-cover border border-white/10" alt="" />
  }

  return (
    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold border border-white/10 ${colors[color]}`}>
      {initials}
    </div>
  )
}
