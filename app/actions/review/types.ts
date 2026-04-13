export type CommentAuthor = {
  id: string;
  name: string;
  pfp: string | null;
  initials: string;
  role: "student" | "teacher";
};

export type CommentItem = {
  id: string;
  user: CommentAuthor;
  content: string;
  createdAt: Date;
  likes: number;
  rating: number;
  replies?: CommentItem[];
};

export type CurrentUser = {
  id: string;
  name: string;
  pfp: string | null;
  initials: string;
} | null;
