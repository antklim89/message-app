-- inserts a row into public.profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    json_value(new.raw_user_meta_data, '$.username' default 'anon' on empty)
  );
  return new;
end;
$$;

-- trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- message helper functions
create or replace function "message_has_liked" (messages) returns boolean as $$
select auth.uid() = (select "authorId" from likes where "authorId" = auth.uid() and "messageId" = $1.id)
$$ language sql stable security definer;

create or replace function "message_in_favorite" (messages) returns boolean as $$
select auth.uid() = (select "authorId" from favorites where "authorId" = auth.uid() and "messageId" = $1.id)
$$ language sql stable security definer;

create or replace function "message_likes_count" (messages) returns bigint as $$
select count(1) from likes where "messageId" = $1.id
$$ language sql stable security definer;


-- followers helper functions
create or replace function "is_following" (profiles) returns boolean as $$
select auth.uid() = (select "authorId" from followers where "authorId" = auth.uid() and "followerId" = $1.id)
$$ language sql stable security definer;

create or replace function "is_follower" (profiles) returns boolean as $$
select auth.uid() = (select "followerId" from followers where "followerId" = auth.uid() and "authorId" = $1.id)
$$ language sql stable security definer;