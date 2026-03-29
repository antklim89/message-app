create or replace function utils.handle_new_user () returns trigger LANGUAGE plpgsql security definer
set
  "search_path" to '' as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    json_value(new.raw_user_meta_data, '$.username' default 'anon_'||gen_random_uuid() on empty)
  );
  return new;
end;
$$;

create
or replace trigger on_auth_user_created
after INSERT on auth.users for EACH row
execute FUNCTION utils.handle_new_user ();