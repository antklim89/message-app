-- inserts a row into public.profiles
create or replace function utils.handle_new_user () returns trigger LANGUAGE plpgsql security definer
set
  "search_path" to '' as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    json_value(new.raw_user_meta_data, '$.username' default 'anon_'||gen_random_uuid() on empty)
  );
  return new;
end;
$$;

create
or replace trigger on_auth_user_created
after INSERT on auth.users for EACH row
execute FUNCTION utils.handle_new_user ();

--
-- buckets
INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
 ('avatars', 'avatars', null, '2026-01-19 07:55:56.023631+00', '2026-01-19 07:55:56.023631+00', 'true', 'false', '8192', ARRAY['image/*'], null, 'STANDARD'),
 ('message_images', 'message_images', null, '2026-02-02 07:18:06.879623+00', '2026-02-02 07:18:06.879623+00', 'true', 'false', '262144', ARRAY['image/*'], null, 'STANDARD'),
 ('message_videos', 'message_videos', null, '2026-02-02 07:22:13.291023+00', '2026-02-02 07:22:13.291023+00', 'true', 'false', '52428800', ARRAY['video/*'], null, 'STANDARD');

CREATE POLICY "Avatars delete for authors only" ON "storage"."objects" FOR DELETE TO "authenticated" USING ((("bucket_id" = 'avatars'::"text") AND ("name" = ("auth"."uid"())::"text")));
CREATE POLICY "Avatars insert for authors only" ON "storage"."objects" FOR INSERT TO "authenticated" WITH CHECK ((("bucket_id" = 'avatars'::"text") AND ("name" = ("auth"."uid"())::"text")));
CREATE POLICY "Avatars select for all" ON "storage"."objects" FOR SELECT USING (("bucket_id" = 'avatars'::"text"));
CREATE POLICY "Avatars update and delete for authors only" ON "storage"."objects" FOR UPDATE TO "authenticated" USING ((("bucket_id" = 'avatars'::"text") AND ("name" = ("auth"."uid"())::"text")));
CREATE POLICY "Message images delete for authors only" ON "storage"."objects" FOR DELETE USING ((("bucket_id" = 'message_images'::"text") AND (( SELECT ("auth"."uid"())::"text" AS "uid") = ("storage"."foldername"("name"))[1])));
CREATE POLICY "Message images insert for authors only" ON "storage"."objects" FOR INSERT WITH CHECK ((("bucket_id" = 'message_images'::"text") AND (( SELECT ("auth"."uid"())::"text" AS "uid") = ("storage"."foldername"("name"))[1])));
CREATE POLICY "Message images select for all" ON "storage"."objects" FOR SELECT USING (("bucket_id" = 'message_images'::"text"));
CREATE POLICY "Message videos delete for authors only" ON "storage"."objects" FOR DELETE TO "authenticated" USING ((("bucket_id" = 'message_videos'::"text") AND (( SELECT ("auth"."uid"())::"text" AS "uid") = ("storage"."foldername"("name"))[1])));
CREATE POLICY "Message videos insert for authors only" ON "storage"."objects" FOR INSERT TO "authenticated" WITH CHECK ((("bucket_id" = 'message_videos'::"text") AND (( SELECT ("auth"."uid"())::"text" AS "uid") = ("storage"."foldername"("name"))[1])));
CREATE POLICY "Message videos select for all" ON "storage"."objects" FOR SELECT USING (("bucket_id" = 'message_videos'::"text"));