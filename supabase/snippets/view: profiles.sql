create or replace view profiles_view
with
  (security_invoker = on) as
select
  p.id,
  p.created,
  p.avatar,
  p.bio,
  p.username,
  p.displayname,

  exists(select "authorId" from followers as f where f."authorId" = auth.uid() and f."followerId" = p.id) as "isFollowing",
  exists(select "followerId" from followers as f where f."followerId" = auth.uid() and "authorId" = p.id) as "isFollower",
  (select count(1) from followers as f where f."followerId" = p.id) as "followersCount",
  (select count(1) from followers as f where f."authorId" = p.id) as "followingsCount",
  (select count(1) from favorites as f where f."authorId" = auth.uid()) as "favoritesCount",
  (select count(1) from messages as m where m."authorId" = p.id) as "messagesCount"
from
  profiles as p

