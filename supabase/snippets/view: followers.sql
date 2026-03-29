create or replace view followers_view
with
  (security_invoker = on) as
select
  f."followerId",
  f."authorId",
  
  p.username,
  p.avatar,

  exists(select 1 from followers where "authorId" = auth.uid() and "followerId" = p.id) as "isFollowing"
from
  followers as f
inner join profiles as p on p.id = f."authorId";
