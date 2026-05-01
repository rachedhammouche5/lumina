create table feynman_attempt (
  id          uuid        primary key default gen_random_uuid(),
  student_id  uuid        references "Student"(std_id) on delete cascade,
  topic_id    text        not null,
  skill_id    text        not null,
  explanation text        not null,
  mastery_score integer   check (mastery_score >= 0 and mastery_score <= 100),
  strengths   jsonb       default '[]',
  gaps        jsonb       default '[]',
  follow_up   text,
  encouragement text,
  created_at  timestamptz default now()
);

alter table feynman_attempt enable row level security;

create policy "students insert own attempts"
  on feynman_attempt for insert
  with check (
    student_id in (select std_id from "Student" where user_id = auth.uid())
  );

create policy "students view own attempts"
  on feynman_attempt for select
  using (
    student_id in (select std_id from "Student" where user_id = auth.uid())
  );
