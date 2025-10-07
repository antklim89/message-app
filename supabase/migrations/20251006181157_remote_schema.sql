
  create policy "Insert, update and delete for authors only 1oj01fe_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'avatars'::text) AND (name = (auth.uid())::text)));



  create policy "Insert, update and delete for authors only 1oj01fe_1"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'avatars'::text) AND (name = (auth.uid())::text)));



  create policy "Insert, update and delete for authors only 1oj01fe_2"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'avatars'::text) AND (name = (auth.uid())::text)));



  create policy "Select for all 1oj01fe_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'avatars'::text));



