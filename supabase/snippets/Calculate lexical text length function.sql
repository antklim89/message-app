create or replace function "public"."calculate_lexical_text_length" (lexical_node jsonb) returns int language plpgsql as $$
DECLARE
  acc int = 0;
  lexical_node_child jsonb;
  type text := lexical_node ->> 'type';
BEGIN
  if type = 'root' or type = 'paragraph' or type = 'link' or type = 'autolink' then
    for lexical_node_child IN select * from jsonb_array_elements((lexical_node -> 'children'))
    LOOP acc := acc + calculate_lexical_text_length(lexical_node_child);
    end LOOP;

    return acc;

  elsif type = 'hashtag' or type = 'text' or type = 'user' or type = 'emoji' then
    return length(lexical_node ->> 'text');
  end if;

  return 0;
END;
$$;
