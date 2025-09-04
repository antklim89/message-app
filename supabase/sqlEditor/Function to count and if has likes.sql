create or replace function "message_has_liked" (messages) returns boolean as $$
select auth.uid() = (select "authorId" from likes where "authorId" = auth.uid() and "messageId" = $1.id)
$$ language sql stable security definer;

create or replace function "message_in_favorite" (messages) returns boolean as $$
select auth.uid() = (select "authorId" from favorites where "authorId" = auth.uid() and "messageId" = $1.id)
$$ language sql stable security definer;

create or replace function "message_likes_count" (messages) returns bigint as $$
select count(1) from likes where "messageId" = $1.id
$$ language sql stable security definer;