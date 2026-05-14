-- Creates a helper RPC to upsert a Teacher row.
-- Accepts text params so PL/pgSQL handles the implicit text→uuid coercion,
-- bypassing PostgREST's schema-cache type mismatch on tchr_id.
create or replace function public.upsert_teacher(
  p_tchr_id    text,
  p_user_id    text,
  p_fullname   text,
  p_email      text,
  p_photo_url  text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into "Teacher" (tchr_id, user_id, tchr_fullname, tchr_email, tchr_pfp)
  values (p_tchr_id::uuid, p_user_id::uuid, p_fullname, p_email, p_photo_url)
  on conflict (tchr_id) do update set
    user_id       = p_user_id::uuid,
    tchr_fullname = p_fullname,
    tchr_email    = p_email,
    tchr_pfp      = coalesce(p_photo_url, "Teacher".tchr_pfp);
end;
$$;

-- Also create a helper for deleting from Teacher by text id (same cast issue on delete)
create or replace function public.delete_teacher(p_tchr_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from "Teacher" where tchr_id = p_tchr_id::uuid;
end;
$$;

-- Updates teacher_request status. Run after dropping any broken approval trigger.
create or replace function public.finalize_teacher_request(
  p_user_id    text,
  p_decision   text,
  p_admin_note text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update teacher_requests
  set
    status     = p_decision,
    admin_note = p_admin_note
  where user_id = p_user_id::uuid
    and status  = 'pending';
end;
$$;
