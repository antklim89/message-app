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
 ('avatars', 'avatars', null, '2026-01-19 07:55:56.023631+00', '2026-01-19 07:55:56.023631+00', 'true', 'false', '8192', ARRAY['image/*'], null, 'STANDARD'),
 ('message_images', 'message_images', null, '2026-02-02 07:18:06.879623+00', '2026-02-02 07:18:06.879623+00', 'true', 'false', '262144', ARRAY['image/*'], null, 'STANDARD'),
 ('message_videos', 'message_videos', null, '2026-02-02 07:22:13.291023+00', '2026-02-02 07:22:13.291023+00', 'true', 'false', '52428800', ARRAY['video/*'], null, 'STANDARD');