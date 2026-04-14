# 📁 lumina - Project Structure

*Generated on: 4/13/2026, 5:59:35 PM*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 170 |
| 📁 Total Folders | 67 |
| 🌳 Max Depth | 6 levels |
| 🛠️ Tech Stack | React, Next.js, TypeScript, CSS, Node.js |

## ⭐ Important Files

- 🟡 🚫 **.gitignore** - Git ignore rules
- 🔴 📖 **README.md** - Project documentation
- 🔵 🔍 **eslint.config.mjs** - ESLint config
- 🟡 ▲ **next.config.ts** - Next.js config
- 🔴 📦 **package.json** - Package configuration
- 🟡 🔷 **tsconfig.json** - TypeScript config

## 📊 File Statistics

### By File Type

- ⚛️ **.tsx** (React TypeScript files): 74 files (43.5%)
- 🔷 **.ts** (TypeScript files): 40 files (23.5%)
- 📄 **.** (Other files): 10 files (5.9%)
- 🖼️ **.png** (PNG images): 7 files (4.1%)
- 🎨 **.svg** (SVG images): 6 files (3.5%)
- 📄 **.sql** (Other files): 5 files (2.9%)
- 📄 **.txt** (Text files): 4 files (2.4%)
- 📕 **.pdf** (PDF files): 4 files (2.4%)
- 📄 **.mjs** (Other files): 3 files (1.8%)
- 🖼️ **.jpg** (JPEG images): 3 files (1.8%)
- 📖 **.md** (Markdown files): 2 files (1.2%)
- 🎨 **.css** (Stylesheets): 2 files (1.2%)
- ⚙️ **.json** (JSON files): 2 files (1.2%)
- ⚙️ **.yaml** (YAML files): 2 files (1.2%)
- ⚙️ **.yml** (YAML files): 1 files (0.6%)
- 🚫 **.gitignore** (Git ignore): 1 files (0.6%)
- 🖼️ **.ico** (Icon files): 1 files (0.6%)
- 📄 **.mp3** (Other files): 1 files (0.6%)
- 📄 **.mp4** (Other files): 1 files (0.6%)
- 📄 **.tsbuildinfo** (Other files): 1 files (0.6%)

### By Category

- **React**: 74 files (43.5%)
- **TypeScript**: 40 files (23.5%)
- **Other**: 21 files (12.4%)
- **Assets**: 17 files (10.0%)
- **Docs**: 10 files (5.9%)
- **Config**: 5 files (2.9%)
- **Styles**: 2 files (1.2%)
- **DevOps**: 1 files (0.6%)

### 📁 Largest Directories

- **root**: 170 files
- **app**: 96 files
- **app/ui**: 29 files
- **public**: 22 files
- **app/skills**: 15 files

## 🌳 Directory Structure

```
lumina/
├── 📄 .codex
├── 📄 .gitattributes
├── 📂 .github/
│   └── 📂 workflows/
│   │   └── ⚙️ playwright.yml
├── 🟡 🚫 **.gitignore**
├── 🚀 app/
│   ├── 📂 @auth/
│   │   ├── 📂 (.)login/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 (.)signup/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 [...catchAll]/
│   │   │   └── ⚛️ page.tsx
│   │   └── ⚛️ default.tsx
│   ├── 📂 actions/
│   │   ├── 🔷 enrollement.ts
│   │   └── 🔷 roadmap.ts
│   ├── 📂 admin/
│   │   ├── 📂 _components/
│   │   │   ├── ⚛️ AdminUsersSection.tsx
│   │   │   ├── ⚛️ TeacherRequestCard.tsx
│   │   │   └── ⚛️ TeacherRequestsSection.tsx
│   │   ├── ⚛️ layout.tsx
│   │   ├── ⚛️ page.tsx
│   │   ├── 📂 requests/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 🔷 types.ts
│   │   ├── 📂 users/
│   │   │   └── ⚛️ page.tsx
│   │   └── ⚛️ users.tsx
│   ├── 📂 ai-tutor/
│   │   └── ⚛️ page.tsx
│   ├── 🔌 api/
│   │   └── 📂 skills/
│   │   │   └── 🔷 route.ts
│   ├── 📂 auth/
│   │   ├── 📂 callback/
│   │   │   └── 🔷 route.ts
│   │   ├── 📂 finalize-signup/
│   │   │   └── 🔷 route.ts
│   │   └── 📂 teacher-request/
│   │   │   └── 🔷 route.ts
│   ├── 🖼️ favicon.ico
│   ├── 📂 features/
│   │   ├── 📂 skill/
│   │   │   └── 🔷 completeSkill.ts
│   │   └── 📂 streak/
│   │   │   ├── 🔷 actions.ts
│   │   │   ├── ⚛️ StreakCelebration.tsx
│   │   │   ├── 🔷 types.ts
│   │   │   └── 🔷 updateStreak.ts
│   ├── 🎨 globals.css
│   ├── ⚛️ layout.tsx
│   ├── 📂 login/
│   │   └── ⚛️ page.tsx
│   ├── ⚛️ page.tsx
│   ├── 📂 profile/
│   │   ├── 🔷 actions.ts
│   │   ├── ⚛️ page.tsx
│   │   └── ⚛️ ProfileClient.tsx
│   ├── 📂 signup/
│   │   └── ⚛️ page.tsx
│   ├── 📂 skills/
│   │   ├── 📂 [skill_id]/
│   │   │   ├── 📂 [topic_id]/
│   │   │   │   ├── ⚛️ content-cards.tsx
│   │   │   │   ├── ⚛️ content-sections.tsx
│   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   └── 📂 quiz/
│   │   │   │   │   ├── 🔷 actions.ts
│   │   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   │   ├── 🔷 quiz.lib.ts
│   │   │   │   │   ├── 🔷 quiz.types.ts
│   │   │   │   │   ├── ⚛️ QuizClient.tsx
│   │   │   │   │   └── 📂 quizComponents/
│   │   │   │   │   │   ├── ⚛️ FeedBackBar.tsx
│   │   │   │   │   │   ├── ⚛️ IntroScreen.tsx
│   │   │   │   │   │   ├── ⚛️ QuestionCard.tsx
│   │   │   │   │   │   ├── ⚛️ ResultScreen.tsx
│   │   │   │   │   │   └── ⚛️ SessionProgress.tsx
│   │   │   └── ⚛️ page.tsx
│   │   └── ⚛️ page.tsx
│   ├── 📂 student/
│   │   ├── 📂 dashboard/
│   │   │   ├── 📂 _components/
│   │   │   │   └── ⚛️ ProgressChart.tsx
│   │   │   └── ⚛️ page.tsx
│   │   └── ⚛️ page.tsx
│   ├── 📂 teacher/
│   │   ├── 📂 apply/
│   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ layout.tsx
│   │   ├── ⚛️ page.tsx
│   │   └── 📂 skills/
│   │   │   ├── 📂 [course_id]/
│   │   │   │   ├── 🔷 actions.ts
│   │   │   │   ├── ⚛️ AddQuizForm.tsx
│   │   │   │   ├── ⚛️ AddTopicForm.tsx
│   │   │   │   ├── ⚛️ CourseDetailView.tsx
│   │   │   │   ├── ⚛️ page.tsx
│   │   │   │   └── ⚛️ TopicNode.tsx
│   │   │   ├── 🔷 actions.ts
│   │   │   ├── ⚛️ DeleteSkillButton.tsx
│   │   │   ├── ⚛️ page.tsx
│   │   │   ├── ⚛️ SkillCard.tsx
│   │   │   ├── ⚛️ SkillFormModal.tsx
│   │   │   └── ⚛️ SkillsHeader.tsx
│   └── 🎨 ui/
│   │   ├── ⚛️ About.tsx
│   │   ├── 📂 auth/
│   │   │   ├── ⚛️ LoginPageView.tsx
│   │   │   └── ⚛️ SignupPageView.tsx
│   │   ├── ⚛️ Button.tsx
│   │   ├── ⚛️ Card.tsx
│   │   ├── ⚛️ Features.tsx
│   │   ├── ⚛️ Footer.tsx
│   │   ├── 🎨 global.css
│   │   ├── ⚛️ Hero.tsx
│   │   ├── ⚛️ HomeLanding.tsx
│   │   ├── ⚛️ Input.tsx
│   │   ├── ⚛️ LastHook.tsx
│   │   ├── ⚛️ Logo.tsx
│   │   ├── ⚛️ LogoutButton.tsx
│   │   ├── ⚛️ MainIdea.tsx
│   │   ├── ⚛️ NavBar.tsx
│   │   ├── ⚛️ ProfileMenu.tsx
│   │   ├── 📂 roadmapcomp/
│   │   │   ├── 🔷 actions.ts
│   │   │   ├── ⚛️ BackButton.tsx
│   │   │   ├── ⚛️ EnrollButton.tsx
│   │   │   ├── ⚛️ EnrollSection.tsx
│   │   │   ├── ⚛️ InfoCard.tsx
│   │   │   ├── ⚛️ node.tsx
│   │   │   ├── ⚛️ ProgressBar.tsx
│   │   │   ├── ⚛️ RoadmapFlow.tsx
│   │   │   └── 🔷 types.ts
│   │   └── 📂 Skills/
│   │   │   ├── ⚛️ CourseCard.tsx
│   │   │   ├── ⚛️ CourseCardSkeleton.tsx
│   │   │   └── ⚛️ CourseSearchClient.tsx
├── 📖 CLAUDE.md
├── 🔷 database.types.ts
├── 🔵 🔍 **eslint.config.mjs**
├── 📂 features/
│   ├── 📂 users/
│   │   └── 📂 actions/
│   │   │   ├── 🔷 deleteUserAccount.ts
│   │   │   ├── 🔷 reviewTeacherRequests.ts
│   │   │   ├── 🔷 syncTables.ts
│   │   │   └── 🔷 updateUserRole.ts
│   └── 🔧 utils/
│   │   └── 📂 auth/
│   │   │   └── 🔷 getRole.ts
├── 📚 lib/
│   ├── 🔷 database.types.ts
│   └── 📂 supabase/
│   │   ├── 🔷 client.ts
│   │   └── 🔷 server.ts
├── 🔷 next-env.d.ts
├── 🟡 ▲ **next.config.ts**
├── 🔴 📦 **package.json**
├── 🔷 playwright.config.ts
├── ⚙️ pnpm-lock.yaml
├── ⚙️ pnpm-workspace.yaml
├── 📄 postcss.config.mjs
├── 📄 project_snapshot_part1.txt
├── 📄 project_snapshot_part2.txt
├── 📄 project_snapshot_part3.txt
├── 📄 project_snapshot.txt
├── 🔷 proxy.ts
├── 🌐 public/
│   ├── 🖼️ orangecyan.jpg
│   ├── 🖼️ orangeline.jpg
│   ├── 📂 png/
│   │   ├── 🖼️ 1.png
│   │   ├── 🖼️ about.png
│   │   ├── 🖼️ auth.jpg
│   │   ├── 🖼️ learning.png
│   │   ├── 🖼️ login.png
│   │   ├── 🖼️ LuminaLogo.png
│   │   └── 🖼️ signup.png
│   ├── 📂 skills/
│   │   └── 🖼️ mastering-git-collaboration.png
│   ├── 📂 svg/
│   │   ├── 🎨 file.svg
│   │   ├── 🎨 globe.svg
│   │   ├── 🎨 next.svg
│   │   ├── 🎨 signup.svg
│   │   ├── 🎨 vercel.svg
│   │   └── 🎨 window.svg
│   ├── 📂 uploads/
│   │   ├── 📂 audio/
│   │   │   └── 📄 1774729461414-Amidinine.mp3
│   │   └── 📂 pdf/
│   │   │   ├── 📕 1774631609172-Assignement 3 (sprint 2).pdf
│   │   │   ├── 📕 1774645898310-lumina backlog.pdf
│   │   │   ├── 📕 1774645956144-main (2).pdf
│   │   │   └── 📕 1775074912156-Error Types.pdf
│   └── 📂 videos/
│   │   └── 📄 homeVideo.mp4
├── 🔴 📖 **README.md**
├── 📂 scripts/
│   ├── 🔷 promote-admin.ts
│   ├── 🔷 seed-supabase.ts
│   └── 🔷 setRoles.ts
├── 📂 supabase/
│   ├── 📂 .temp/
│   │   ├── 📄 cli-latest
│   │   ├── 📄 gotrue-version
│   │   ├── 📄 pooler-url
│   │   ├── 📄 postgres-version
│   │   ├── 📄 project-ref
│   │   ├── 📄 rest-version
│   │   ├── 📄 storage-migration
│   │   └── 📄 storage-version
│   └── 📂 migrations/
│   │   ├── 📂 20260226213253_init/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20260227130115_add_optional_course_fields/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20260305233000_teacher_requests_auditlog/
│   │   │   └── 📄 migration.sql
│   │   ├── 📂 20260306001000_drop_legacy_password_columns/
│   │   │   └── 📄 migration.sql
│   │   └── 📄 20260310165723_remote_schema.sql
├── 🔷 supabase.ts
├── 📄 tailwind.config.mjs
├── 🧪 tests/
│   ├── 📂 e2e/
│   │   └── 🔷 routes.spec.ts
│   └── 📂 unit/
│   │   ├── 🔷 authCallbackRoute.test.ts
│   │   └── 🔷 updateUserRole.test.ts
├── 🟡 🔷 **tsconfig.json**
├── 📄 tsconfig.tsbuildinfo
└── 🔷 vitest.config.ts
```

## 📖 Legend

### File Types
- 📄 Other: Other files
- ⚙️ Config: YAML files
- 🚫 DevOps: Git ignore
- 📖 Docs: Markdown files
- ⚛️ React: React TypeScript files
- 🔷 TypeScript: TypeScript files
- 🖼️ Assets: Icon files
- 🎨 Styles: Stylesheets
- ⚙️ Config: JSON files
- ⚙️ Config: YAML files
- 📄 Docs: Text files
- 🖼️ Assets: JPEG images
- 🖼️ Assets: PNG images
- 🎨 Assets: SVG images
- 📕 Docs: PDF files

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
