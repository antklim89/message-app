create or replace view messages_view
with
  (security_invoker = on) as
select
  m."answerId",
  m."authorId",
  m.body,
  m.created,
  m."embeddedItems",
  m."embeddedType",
  m.id,
  m.updated,
  p.username,
  p.avatar,
  
  exists(select "messageId" from likes where likes."messageId" = m.id and likes."authorId" = auth.uid()) as "hasLiked",
  exists(select "messageId" from favorites where favorites."messageId" = m.id and favorites."authorId" = auth.uid()) as "isFavorite",
  (select count(1) from likes as l where l."messageId" = m.id) as "likesCount",
  (select count(1) from messages as a where a."answerId" = m.id) as "answersCount",

  m.body_tsvector
from
  messages as m
  inner join profiles as p on p.id = m."authorId"