drop policy "Enable update for authors only" on "public"."messages";

alter table "public"."messages" add constraint "messages_embeddedItems_check" CHECK (((cardinality("embeddedItems") > 0) AND (cardinality("embeddedItems") <= 4))) not valid;

alter table "public"."messages" validate constraint "messages_embeddedItems_check";

drop policy "Gallery delete for authors only" on "storage"."objects";

drop policy "Gallery insert for authors only" on "storage"."objects";

drop policy "Gallery select for all" on "storage"."objects";


  create policy "Message images delete for authors only"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'message_images'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Message images insert for authors only"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'message_images'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Message images select for all"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'message_images'::text));



  create policy "Message videos delete for authors only"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'message_videos'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Message videos insert for authors only"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'message_videos'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Message videos select for all"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'message_videos'::text));



