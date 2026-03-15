create or replace view messages_view
with
  (security_invoker = on) as
select
  m.*,
  json_object('id': p.id, 'username': p.username, 'avatar': p.avatar) as author,
  exists(select 1 from likes as l where l."messageId" = m.id and m."authorId" = auth.uid()) as "hasLiked",
  exists(select 1 from favorites as f where f."messageId" = m.id and m."authorId" = auth.uid()) as "isFavorite",
  (select count(1) from likes as l where l."messageId" = m.id) as likesCount,
  (select count(1) from messages as a where a.id = m.id) as answersCount
from messages as m
inner join profiles as p on p.id = m."authorId"
-- inner join messages as a on a.id = m.id
-- where id = '0033d608-d477-4428-b4fc-a9c4c73d5a9f'
-- limit 200;

-- drop view messages_view;

-- delete from messages;

select uuid_generate_v1