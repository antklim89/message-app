create or replace function utils.handle_new_message () returns trigger language plpgsql security definer
set
  "search_path" to '' as $_$
BEGIN
  new.body_tsvector = to_tsvector('english', utils.extract_and_insert_hashtags(new.body));
  return new;
END;
$_$;

create or replace function utils.extract_and_insert_hashtags (lexical_node jsonb, result text = ''::text) returns text language plpgsql security definer
set
  "search_path" to '' as $_$
DECLARE
  lexical_node_child jsonb;
  type text := lexical_node ->> 'type';
BEGIN
  if type = 'root' or type = 'paragraph' or type = 'link' or type = 'autolink' then
    FOR lexical_node_child IN SELECT * FROM jsonb_array_elements((lexical_node -> 'children'))
    LOOP
      result := utils.extract_and_insert_hashtags(lexical_node_child, result);
    END LOOP;
  end if;

  if type = 'hashtag' then
    insert into public.hashtags (hashtag) values (lexical_node ->> 'text');
  end if;

  if type = 'text' or type = 'hashtag' then
    result := result || utils.extract_and_insert_hashtags(lexical_node_child, lexical_node ->> 'text');
  end if;

  return result;
END;
$_$;

create
or replace trigger on_message_created
before insert on public.messages for each row
execute procedure utils.handle_new_message ();

-- DROP FUNCTION utils.extract_and_insert_hashtags(jsonb)

-- create index body_tsvector_idx on messages using gin (body_tsvector); 
-- alter table public.messages add column body_tsvector tsvector;
