alter table public.teacher_requests
  add column if not exists photo_url text,
  add column if not exists gov_id_url text,
  add column if not exists certification_url text;
