create or replace function utils.handle_new_message () returns trigger language plpgsql security definer
set
  "search_path" to '' as $_$
BEGIN
  perform utils.extract_and_insert_hashtags(new.body);
  return new;
END;
$_$;

create or replace function utils.extract_and_insert_hashtags (lexical_node jsonb) returns void language plpgsql security definer
set
  "search_path" to '' as $_$
DECLARE
  lexical_node_child jsonb;
  type text := lexical_node ->> 'type';
BEGIN
  if type = 'root' or type = 'paragraph' or type = 'link' or type = 'autolink' then
    FOR lexical_node_child IN SELECT * FROM jsonb_array_elements((lexical_node -> 'children'))
    LOOP
      perform utils.extract_and_insert_hashtags(lexical_node_child);
    END LOOP;

  elsif type = 'hashtag' then
    insert into public.hashtags (hashtag) values (lexical_node ->> 'text');
  end if;
END;
$_$;

create
or replace trigger on_message_created
after insert on public.messages for each row
execute procedure utils.handle_new_message ();

