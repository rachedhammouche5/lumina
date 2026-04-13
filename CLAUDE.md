# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# LUMINA — AI-Assisted Adaptive Learning Platform

## Project Overview
LUMINA is a university-level adaptive learning platform built as a bachelor's thesis project
at the University of Constantine 2 (Faculty of NTIC, Department TLSI).
It helps students learn through structured content, adaptive quizzes, and gamification,
while giving teachers tools to upload and manage course material.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend/DB:** Supabase (PostgreSQL + RLS + Auth)
- **AI (planned):** Gemini API (gemini-1.5-flash), LangChain JS, HuggingFace embeddings (all-MiniLM-L6-v2), pgvector

## Project Structureapp/
@auth/                        # Parallel route — modal-style login/signup overlays
(.)login/                   # Intercepted login route
(.)signup/                  # Intercepted signup route
actions/                      # Server actions (enrollment, roadmap)
admin/                        # Admin dashboard (teacher request review)
ai-tutor/                     # AI chat assistant page (to be built out)
api/skills/                   # API route for skills
auth/                         # Auth routes (callback, finalize-signup, teacher-request)
login/                        # Standalone login page
signup/                       # Standalone signup page
profile/                      # User profile page + actions
skills/                       # Student-facing skill browser
[skill_id]/
[topic_id]/
page.tsx                # Topic content page
content-cards.tsx       # Content card components
content-sections.tsx    # Content section layout
quiz/
page.tsx              # Quiz page (server)
QuizClient.tsx        # Quiz orchestrator (client)
quiz.lib.ts           # Scoring and adaptive logic
quiz.types.ts         # Quiz TypeScript types
actions.ts            # Quiz server actions
quizComponents/       # FeedBackBar, IntroScreen, QuestionCard, ResultScreen, SessionProgress
student/                      # Student dashboard
teacher/
apply/                      # Teacher application page
skills/                     # Teacher skill/topic/content management
[course_id]/              # Course detail: AddTopicForm, AddQuizForm, TopicNode, CourseDetailView
ui/                           # Shared UI components
roadmapcomp/                # Roadmap flow components (RoadmapFlow, EnrollButton, ProgressBar, etc.)
Skills/                     # CourseCard, CourseCardSkeleton, CourseSearchClient
auth/                       # LoginPageView, SignupPageView
NavBar.tsx, Button.tsx, Card.tsx, Input.tsx, Footer.tsx, Logo.tsx, ...features/
users/actions/                # reviewTeacherRequests, syncTables, updateUserRole
utils/auth/                   # getRole utilitylib/
database.types.ts             # Auto-generated Supabase types
supabase/
client.ts                   # Browser Supabase client
server.ts                   # Server Supabase clientsupabase/migrations/            # All DB migrations in order
scripts/                        # Admin scripts (promote-admin, seed, setRoles)
public/uploads/                 # Teacher-uploaded files (audio/, pdf/)
tests/
e2e/                          # Playwright route tests
unit/                         # Vitest unit tests

## Database Conventions
- Column naming uses prefixes: `skl_id`, `tpc_id`, `cntnt_id`, `std_id`, etc.
- Main tables: `Skill`, `Topic`, `Content`, `Student`, `enroll`, `quiz_attempt`, `leaderboard`
- Auth flows through `auth.users` → `Student.std_id` → enrollment
- RLS is enabled — always check policies when queries return empty unexpectedly

## Content Hierarchy
Skill → Topic → Content

Each topic can have multiple content items of 4 types:
- **video** (YouTube embed via react-youtube)
- **audio** (custom HTML5 player)
- **pdf** (full-viewport modal overlay)
- **docs** (external documentation URL)

Files are stored in `/public/uploads/` (local, not Supabase Storage).

## Quiz System
- Located at `app/skills/[skill_id]/[topic_id]/quiz/page.tsx`
- Adaptive difficulty: easy → medium → hard → pro
- Scoring includes time bonuses and hint penalties
- Architecture: `quiz.types.ts`, `quiz.lib.ts`, `QuizClient.tsx` (orchestrator) + 4 subcomponents
- Hints are currently mocked (not live API calls)

## Auth & Roles
Four roles: `student`, `teacher`, `teacher_pending`, `admin`
- Role is stored in Supabase auth metadata
- Role-based navbar reads from session metadata
- `teacher_pending` users must not hit redirect loops — handle explicitly in middleware/routing

## Current State
The following core features are built and working:
- Authentication and role-based routing
- Teacher: create/delete skills and topics, upload content (video, audio, PDF, docs)
- Student: browse skills, view topic content, take quizzes
- Gamification: streaks, XP, leaderboard (basic implementation)
- Enrollment system

## Known Issues to Fix
- Review and fix any remaining TypeScript errors (null/undefined assignments)
- Controlled/uncontrolled input warnings in teacher upload forms
- File upload body size limit (Next.js default 1MB — may need to increase for PDFs/audio)
- Audit RLS policies for any queries silently returning empty results

## Immediate Next Goal — RAG AI Chat Assistant
We are adding a RAG-based AI chat assistant as a supervisor-requested feature.

### Planned Stack
- **Embeddings:** HuggingFace `all-MiniLM-L6-v2`
- **LLM:** Gemini API (`gemini-1.5-flash`) via LangChain JS
- **Vector Store:** pgvector on Supabase
- **Orchestration:** LangChain JS

### How it should work
1. Teacher uploads content (YouTube link, PDF, audio, docs URL)
2. Content is extracted to plain text (YouTube transcript, PDF text, docs scrape)
3. Text is chunked and embedded using all-MiniLM-L6-v2
4. Embeddings stored in Supabase with pgvector
5. Student asks a question in the chat UI
6. Question is embedded → similarity search → top chunks retrieved
7. Chunks passed as context to Gemini → answer returned to student

### Implementation order
1. Build and test embedding pipeline on hardcoded text first
2. Add PDF text extractor
3. Add YouTube transcript extractor
4. Add docs URL scraper
5. Skip or defer audio transcription (not needed for demo)
6. Wire up the chat UI to the retrieval + generation pipeline

## Important Notes for Claude Code
- This is a Next.js App Router project — always use server components and server actions
  where possible; mark client components explicitly with `"use client"`
- Supabase client: use the server-side client for server components/actions,
  browser client for client components
- Do not move uploaded files to Supabase Storage — keep using `/public/uploads/` for now
- The thesis deadline is close — prioritize working code over perfect architecture
- When fixing bugs, explain what was wrong so the developer can learn from it


## Commands

```bash
npm run dev          # Start Next.js development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run unit tests (Vitest)
npm run test:e2e     # Run end-to-end tests (Playwright)
npm run seed         # Seed Supabase database
npm run promote:admin  # Promote a user to admin role
```

Run a single unit test file:
```bash
npx vitest run tests/unit/path/to/file.test.ts
```

## Architecture Overview

**Lumina** is a full-stack adaptive learning platform built with Next.js App Router, Supabase (PostgreSQL + Auth), and Tailwind CSS 4.

### Role-Based Access Control

Three user roles managed via Supabase JWT `app_metadata.role`:
- **student** — default role; enroll in skills, take quizzes, track progress
- **teacher** / **teacher_pending** — create/manage skills and content; teacher_pending awaits admin approval
- **admin** — review and approve/reject teacher requests

Role extraction lives in `features/utils/auth/`. After auth callback, `getRole(user)` redirects to the appropriate dashboard (`/student`, `/teacher`, or `/admin`).

### Content Hierarchy

```
Skill → Topic (hierarchical, parent_id FK) → Content (video/audio/pdf/docs)
                                           → Quiz → Questions → Answers
```

Students enroll in Skills, progress through Topics, consume Content, and take Quizzes. Scores are saved to the `Score` table per topic.

### Next.js App Router Patterns

- **Server Components** by default (async pages that fetch directly from Supabase)
- **Server Actions** (`"use server"`) for all mutations — enrollment, quiz scoring, content/topic CRUD, admin decisions. Always call `revalidatePath()` after mutations.
- **`@auth/` parallel route** — modal-based login/signup overlaid on any page
- **`auth/callback`** — exchanges Supabase OAuth code, assigns default "student" role, handles teacher request flow

### Supabase Integration

- `lib/supabase/` — two clients: `createClient()` for SSR (cookie-based sessions), admin client using `SERVICE_ROLE_KEY` for privileged operations
- Database types auto-generated at `lib/database.types.ts` — regenerate after schema changes with the Supabase CLI
- Migrations live in `supabase/migrations/`

### File Uploads

Uploaded content files are stored at `public/uploads/[type]/[timestamp]-[filename]`. Only the path/URL is stored in the database.

### Roadmap Visualization

Interactive skill roadmaps use `@xyflow/react`. The topic hierarchy (`parent_id`) drives the node graph. Roadmap data is fetched via `/api/roadmaps` and `/api/skills` routes.

### Testing

- **Unit tests** (`tests/unit/`) use Vitest; Supabase clients are mocked via `vi.mock()`
- **E2E tests** (`tests/e2e/`) use Playwright against the local dev server

## Key Environment Variables

Required in `.env`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL` (Neon PostgreSQL direct connection)
