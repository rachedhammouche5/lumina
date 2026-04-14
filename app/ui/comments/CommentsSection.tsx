// components/comments/CommentsSection.tsx
"use client"
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Composer from './Composer'
import CommentCard from './CommentCard'
import Rating from './Rating'
import { addComment, likeComment } from '@/app/actions/review/comments'
import type { CommentItem, CurrentUser } from '../../actions/review/types'

type CommentsSectionProps = {
  initialComments: CommentItem[]
  skillId: string
  currentUser: CurrentUser
}

export default function CommentsSection({ initialComments, skillId, currentUser }: CommentsSectionProps) {
  const [sort, setSort] = useState<'newest' | 'popular'>('newest')
  const [visibleCount, setVisibleCount] = useState(4)
  const router = useRouter()
  const pageSize = 4

  const comments = useMemo(() => {
    const items = [...(initialComments ?? [])]
    if (sort === 'popular') {
      return items.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [initialComments, sort])

  const visibleComments = comments.slice(0, visibleCount)
  const hasMoreComments = visibleCount < comments.length

  const handleAddComment = async (content: string, parentId?: string, rating = 5) => {
    await addComment(skillId, content, parentId, rating)
    router.refresh()
  }

  const handleLike = async (reviewId: string) => {
    await likeComment(reviewId, skillId)
    router.refresh()
  }

  return (
    <section className="max-w-2xl mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white">Discussion</h2>
        <select 
          value={sort}
          onChange={(e) => {
            setSort(e.target.value as 'newest' | 'popular')
            setVisibleCount(pageSize)
          }}
          className="bg-transparent text-slate-400 text-sm focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      <div className="mb-10">
        {currentUser ? (
          <Composer
            currentUser={currentUser}
            onSubmit={(content, rating) => handleAddComment(content, undefined, rating)}
          />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
            Sign in to post a review or reply.
          </div>
        )}
      </div>

      <div className="space-y-4">
        {visibleComments.map((comment) => (
          <CommentCard 
            key={comment.id} 
            comment={comment} 
            currentUser={currentUser}
            onLike={handleLike}
            onReply={(parentId: string, content: string) => handleAddComment(content, parentId)}
          />
        ))}
        {!comments.length && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-sm text-slate-500">
            No reviews yet. Be the first to share your experience.
          </div>
        )}
        {hasMoreComments && (
          <button
            type="button"
            onClick={() => setVisibleCount((current) => current + pageSize)}
            className="mx-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-orange-500/30 hover:text-white"
          >
            Show more
            <span className="text-xs text-slate-500">
              ({comments.length - visibleCount} left)
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
