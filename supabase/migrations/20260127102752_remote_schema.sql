create extension if not exists "pg_cron" with schema "pg_catalog";

create schema if not exists "pgmq";

alter table "public"."messages" add constraint "messages_embeddedType_check" CHECK ((("embeddedType" = 'images'::text) OR ("embeddedType" = 'videos'::text))) not valid;

alter table "public"."messages" validate constraint "messages_embeddedType_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    json_value(new.raw_user_meta_data, '$.username' default 'anon' on empty)
  );
  return new;
end;
$function$
;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

drop policy "Gallery update for authors only" on "storage"."objects";

drop policy "Gallery delete for authors only" on "storage"."objects";

drop policy "Gallery insert for authors only" on "storage"."objects";


  create policy "Gallery delete for authors only"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'gallery'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Gallery insert for authors only"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'gallery'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



