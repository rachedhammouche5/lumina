// components/comments/Composer.tsx
"use client"
import { useState } from 'react'
import Avatar from './Avatar'
import type { CurrentUser } from '../../actions/review/types'

interface ComposerProps {
  currentUser?: CurrentUser
  placeholder?: string
  onSubmit: (content: string, rating: number) => Promise<void>
  autoFocus?: boolean
  showRating?: boolean
  initialRating?: number
}

export default function Composer({
  currentUser,
  placeholder = "Add a comment...",
  onSubmit,
  autoFocus,
  showRating = true,
  initialRating = 5,
}: ComposerProps) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(initialRating)

  const handleSend = async () => {
    if (!text.trim() || loading) return
    setLoading(true)
    await onSubmit(text, rating)
    setText('')
    setRating(initialRating)
    setLoading(false)
  }

  return (
    <div className="flex gap-3">
      <Avatar src={currentUser?.pfp} initials={currentUser?.initials ?? "U"} />
      <div className="flex-1">
        <textarea
          autoFocus={autoFocus}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50 min-h-[100px] resize-none transition-all"
        />
        {showRating && (
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Rating</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, index) => {
                const value = index + 1
                const active = value <= rating
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    aria-label={`Set rating to ${value} out of 5`}
                    className={`text-lg transition-colors ${active ? 'text-orange-400' : 'text-slate-700 hover:text-slate-500'}`}
                  >
                    ★
                  </button>
                )
              })}
            </div>
            <span className="text-xs text-slate-400">{rating}/5</span>
          </div>
        )}
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSend}
            disabled={!text.trim() || loading}
            className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  )
}
