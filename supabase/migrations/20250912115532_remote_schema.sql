CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


  create policy "All can vew avatars 1oj01fe_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'avatars'::text));



  create policy "Only author can update, delete or insert avatar 1oj01fe_0"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'avatars'::text) AND (name = ( SELECT (auth.uid())::text AS uid))));



  create policy "Only author can update, delete or insert avatar 1oj01fe_1"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'avatars'::text) AND (name = ( SELECT (auth.uid())::text AS uid))));



  create policy "Only author can update, delete or insert avatar 1oj01fe_2"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'avatars'::text) AND (name = ( SELECT (auth.uid())::text AS uid))));



