-- inserts a row into public.profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    json_value(new.raw_user_meta_data, '$.username' default 'anon' on empty)
  );
  return new;
end;
$$;

-- trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

--
-- buckets
INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('gallery', 'gallery', NULL, '2026-01-19 07:56:13.806545+00', '2026-01-19 07:56:13.806545+00', true, false, 524288, '{image/*}', NULL, 'STANDARD'),
	('avatars', 'avatars', NULL, '2026-01-19 07:55:56.023631+00', '2026-01-19 07:55:56.023631+00', true, false, 8192, '{image/*}', NULL, 'STANDARD');

