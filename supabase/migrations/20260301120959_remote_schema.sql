alter table "public"."followers" enable row level security;


  create policy "Enable delete for authors only"
  on "public"."followers"
  as permissive
  for delete
  to public
using ((( SELECT auth.uid() AS uid) = "authorId"));



  create policy "Enable insert for authors only"
  on "public"."followers"
  as permissive
  for insert
  to authenticated
with check ((( SELECT auth.uid() AS uid) = "authorId"));



  create policy "Enable users to view their own data only"
  on "public"."followers"
  as permissive
  for select
  to authenticated
using (((( SELECT auth.uid() AS uid) = "authorId") OR (( SELECT auth.uid() AS uid) = "followerId")));



