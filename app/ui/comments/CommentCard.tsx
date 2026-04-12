// components/comments/CommentCard.tsx
"use client"
import { useState } from 'react'
import Avatar from './Avatar'
import Composer from './Composer'
import { formatDistanceToNow } from 'date-fns'
import type { CommentItem, CurrentUser } from '../../actions/review/types'

type CommentCardProps = {
  comment: CommentItem
  currentUser: CurrentUser
  onLike: (reviewId: string) => Promise<void>
  onReply: (parentId: string, content: string) => Promise<void>
}

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, index) => {
    const value = index + 1
    return (
      <span key={value} className={value <= rating ? "text-orange-400" : "text-slate-700"}>
        ★
      </span>
    )
  })

export default function CommentCard({ comment, currentUser, onLike, onReply }: CommentCardProps) {
  const [isReplying, setIsReplying] = useState(false)
  const authorName = comment?.user?.name ?? "Anonymous"
  const authorInitials = comment?.user?.initials ?? "??"
  const isTeacher = comment.user.role === "teacher"
  const borderAccent = isTeacher ? "border-l-blue-500/70" : "border-l-orange-500/70"
  const badgeTone = isTeacher
    ? "bg-blue-500/15 text-blue-300 border-blue-500/20"
    : "bg-orange-500/15 text-orange-300 border-orange-500/20"

  return (
    <div className={`group bg-linear-to-br from-white/6 to-white/0 border border-white/5 border-l-4 ${borderAccent} rounded-2xl p-4 transition-all hover:border-white/10`}>
      <div className="flex gap-3">
        <Avatar src={comment?.user?.pfp} initials={authorInitials} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-slate-200">{authorName}</span>
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${badgeTone}`}>
              {isTeacher ? "Teacher" : "Student"}
            </span>
            <span className="text-[11px] text-slate-500">
              {formatDistanceToNow(comment.createdAt)} ago
            </span>
            <span className="inline-flex items-center gap-0.5 text-[11px]">
              {renderStars(comment.rating)}
              <span className="ml-1 text-slate-500">{comment.rating}/5</span>
            </span>
          </div>
          <p className="text-[14px] text-slate-400 leading-relaxed mb-3">
            {comment.content}
          </p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onLike(comment.id)}
              disabled={!currentUser}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-orange-400 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              ♥ {comment.likes}
            </button>
            {currentUser && (
              <button 
                onClick={() => setIsReplying(!isReplying)}
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                Reply
              </button>
            )}
          </div>

          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 ml-2 pl-4 border-l border-white/5 space-y-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className={`flex bg-linear-to-br from-white/7 to-white/1 gap-3 rounded-xl border border-white/5 border-l-4 ${reply.user.role === "teacher" ? "border-l-blue-500/70" : "border-l-orange-500/70"} bg-black/10 p-3`}>
                  <Avatar src={reply.user.pfp} initials={reply.user.initials} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-[13px] text-slate-300">{reply.user.name}</span>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] ${reply.user.role === "teacher" ? "bg-blue-500/15 text-blue-300 border-blue-500/20" : "bg-orange-500/15 text-orange-300 border-orange-500/20"}`}>
                        {reply.user.role === "teacher" ? "Teacher" : "Student"}
                      </span>
                      <span className="text-[10px] text-slate-500">{formatDistanceToNow(reply.createdAt)} ago</span>
                      <span className="inline-flex items-center gap-0.5 text-[10px]">
                        {renderStars(reply.rating)}
                        <span className="ml-1 text-slate-500">{reply.rating}/5</span>
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentUser && isReplying && (
            <div className="mt-4">
              <Composer 
                currentUser={currentUser} 
                placeholder={`Reply to ${authorName}...`}
                autoFocus
                showRating={false}
                onSubmit={async (content, rating) => {
                  void rating
                  await onReply(comment.id, content)
                  setIsReplying(false)
                }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
