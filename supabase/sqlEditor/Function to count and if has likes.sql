create or replace function "hasLiked" (messages) returns boolean as $$
select auth.uid() = (select "authorId" from likes where "authorId" = auth.uid() and "messageId" = $1.id)
$$ language sql stable security definer;

create or replace function "isFavorite" (messages) returns boolean as $$
select auth.uid() = (select "authorId" from favorites where "authorId" = auth.uid() and "messageId" = $1.id)
$$ language sql stable security definer;

create or replace function "likesCount" (messages) returns bigint as $$
select count(1) from likes where "messageId" = $1.id
$$ language sql stable security definer;