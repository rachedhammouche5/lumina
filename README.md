This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
lumina
├─ .tmp
├─ app
│  ├─ @auth
│  │  ├─ (.)login
│  │  │  └─ page.tsx
│  │  ├─ (.)signup
│  │  │  └─ page.tsx
│  │  ├─ default.tsx
│  │  └─ [...catchAll]
│  │     └─ page.tsx
│  ├─ actions
│  │  ├─ enrollement.ts
│  │  └─ roadmap.ts
│  ├─ admin
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ types.ts
│  │  └─ _components
│  │     ├─ TeacherRequestCard.tsx
│  │     └─ TeacherRequestsSection.tsx
│  ├─ ai-tutor
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ roadmaps
│  │  │  └─ [roadmapId]
│  │  └─ skills
│  │     └─ route.ts
│  ├─ auth
│  │  ├─ callback
│  │  │  └─ route.ts
│  │  ├─ finalize-signup
│  │  │  └─ route.ts
│  │  └─ teacher-request
│  │     └─ route.ts
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ login
│  │  └─ page.tsx
│  ├─ page.tsx
│  ├─ profile
│  │  ├─ actions.ts
│  │  ├─ page.tsx
│  │  └─ ProfileClient.tsx
│  ├─ signup
│  │  └─ page.tsx
│  ├─ skills
│  │  ├─ page.tsx
│  │  └─ [skill_id]
│  │     ├─ page.tsx
│  │     └─ [topic_id]
│  │        ├─ AudioPlayer.tsx
│  │        ├─ content-cards.tsx
│  │        ├─ content-sections.tsx
│  │        ├─ page.tsx
│  │        └─ quiz
│  │           ├─ actions.ts
│  │           ├─ page.tsx
│  │           ├─ quiz.lib.ts
│  │           ├─ quiz.types.ts
│  │           ├─ QuizClient.tsx
│  │           └─ quizComponents
│  │              ├─ FeedBackBar.tsx
│  │              ├─ IntroScreen.tsx
│  │              ├─ QuestionCard.tsx
│  │              ├─ ResultScreen.tsx
│  │              └─ SessionProgress.tsx
│  ├─ student
│  │  ├─ dashboard
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ teacher
│  │  ├─ apply
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ skills
│  │     ├─ actions.ts
│  │     ├─ AddCourseForm.tsx
│  │     ├─ page.tsx
│  │     └─ [course_id]
│  │        ├─ actions.ts
│  │        ├─ AddQuizForm.tsx
│  │        ├─ AddTopicForm.tsx
│  │        ├─ CourseDetailView.tsx
│  │        ├─ page.tsx
│  │        └─ TopicNode.tsx
│  └─ ui
│     ├─ About.tsx
│     ├─ auth
│     │  ├─ LoginPageView.tsx
│     │  └─ SignupPageView.tsx
│     ├─ Button.tsx
│     ├─ Card.tsx
│     ├─ Features.tsx
│     ├─ Footer.tsx
│     ├─ global.css
│     ├─ Hero.tsx
│     ├─ HomeLanding.tsx
│     ├─ Input.tsx
│     ├─ LastHook.tsx
│     ├─ Logo.tsx
│     ├─ LogoutButton.tsx
│     ├─ MainIdea.tsx
│     ├─ NavBar.tsx
│     ├─ roadmapcomp
│     │  ├─ actions.ts
│     │  ├─ BackButton.tsx
│     │  ├─ EnrollButton.tsx
│     │  ├─ EnrollSection.tsx
│     │  ├─ InfoCard.tsx
│     │  ├─ node.tsx
│     │  ├─ ProgressBar.tsx
│     │  ├─ RoadmapFlow.tsx
│     │  └─ types.ts
│     └─ Skills
│        ├─ CourseCard.tsx
│        ├─ CourseCardSkeleton.tsx
│        └─ CourseSearchClient.tsx
├─ database.types.ts
├─ eslint.config.mjs
├─ features
│  ├─ users
│  │  └─ actions
│  │     ├─ reviewTeacherRequests.ts
│  │     ├─ syncTables.ts
│  │     └─ updateUserRole.ts
│  └─ utils
│     └─ auth
│        └─ getRole.ts
├─ lib
│  ├─ database.types.ts
│  └─ supabase
│     ├─ client.ts
│     └─ server.ts
├─ next.config.ts
├─ package.json
├─ playwright.config.ts
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ postcss.config.mjs
├─ project_snapshot.txt
├─ project_snapshot_part1.txt
├─ project_snapshot_part2.txt
├─ project_snapshot_part3.txt
├─ proxy.ts
├─ public
│  ├─ orangecyan.jpg
│  ├─ orangeline.jpg
│  ├─ png
│  │  ├─ 1.png
│  │  ├─ about.png
│  │  ├─ auth.jpg
│  │  ├─ learning.png
│  │  ├─ login.png
│  │  ├─ LuminaLogo.png
│  │  └─ signup.png
│  ├─ svg
│  │  ├─ file.svg
│  │  ├─ globe.svg
│  │  ├─ next.svg
│  │  ├─ signup.svg
│  │  ├─ vercel.svg
│  │  └─ window.svg
│  ├─ uploads
│  │  ├─ audio
│  │  │  └─ 1774729461414-Amidinine.mp3
│  │  └─ pdf
│  │     ├─ 1774631609172-Assignement 3 (sprint 2).pdf
│  │     ├─ 1774645898310-lumina backlog.pdf
│  │     └─ 1774645956144-main (2).pdf
│  └─ videos
│     └─ homeVideo.mp4
├─ README.md
├─ scripts
│  ├─ seed-supabase.ts
│  └─ setRoles.ts
├─ supabase
│  ├─ .temp
│  │  ├─ cli-latest
│  │  ├─ gotrue-version
│  │  ├─ pooler-url
│  │  ├─ postgres-version
│  │  ├─ project-ref
│  │  ├─ rest-version
│  │  ├─ storage-migration
│  │  └─ storage-version
│  └─ migrations
│     ├─ 20260226213253_init
│     │  └─ migration.sql
│     ├─ 20260227130115_add_optional_course_fields
│     │  └─ migration.sql
│     ├─ 20260305233000_teacher_requests_auditlog
│     │  └─ migration.sql
│     ├─ 20260306001000_drop_legacy_password_columns
│     │  └─ migration.sql
│     ├─ 20260310165723_remote_schema.sql
│     ├─ 20260316123000_roadmap_system
│     └─ 20260316124500_seed_sample_roadmap
├─ tailwind.config.mjs
├─ tests
│  ├─ e2e
│  │  └─ routes.spec.ts
│  └─ unit
│     ├─ authCallbackRoute.test.ts
│     └─ updateUserRole.test.ts
├─ tsconfig.json
└─ vitest.config.ts

```