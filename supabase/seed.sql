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


-- profile helper functions
create or replace function "is_following" (profiles) returns boolean as $$
select auth.uid() = (select "authorId" from followers where "authorId" = auth.uid() and "followerId" = $1.id)
$$ language sql stable security definer;

create or replace function "is_follower" (profiles) returns boolean as $$
select auth.uid() = (select "followerId" from followers where "followerId" = auth.uid() and "authorId" = $1.id)
$$ language sql stable security definer;

create or replace function "followers_count" (profiles) returns bigint as $$
select count(1) from followers where "followerId" = $1.id
$$ language sql stable security definer;

create or replace function "followings_count" (profiles) returns bigint as $$
select count(1) from followers where "authorId" = $1.id
$$ language sql stable security definer;

create or replace function "favorites_count" (profiles) returns bigint as $$
select count(1) from favorites where "authorId" = auth.uid()
$$ language sql stable security definer;

create or replace function "messages_count" (profiles) returns bigint as $$
select count(1) from messages where "authorId" = $1.id
$$ language sql stable security definer;

-- lexical node helper functions
create or replace function process_lexical_node_with_children (lexical_node jsonb, result_length int = 0) RETURNS int as $$
DECLARE
    lexical_node_child jsonb;
BEGIN
  FOR lexical_node_child IN SELECT * FROM jsonb_array_elements((lexical_node -> 'children'))
  LOOP
      result_length := result_length + calculate_lexical_text_length(lexical_node_child, result_length);
  END LOOP;

  return result_length;
END;
$$ LANGUAGE plpgsql;

create or replace function calculate_lexical_text_length (lexical_node jsonb, result_length int = 0) RETURNS int as $$
DECLARE
  result int;
BEGIN
  return CASE lexical_node ->> 'type'
      WHEN 'root' THEN process_lexical_node_with_children(lexical_node, result_length)
      WHEN 'paragraph' THEN process_lexical_node_with_children(lexical_node, result_length)
      WHEN 'link' THEN process_lexical_node_with_children(lexical_node, result_length)
      WHEN 'text' THEN length(lexical_node ->> 'text')
      WHEN 'user' THEN length(lexical_node ->> 'text')
      WHEN 'hashtag' THEN length(lexical_node ->> 'text')
      WHEN 'emoji' THEN length(lexical_node ->> 'text')
      ELSE 0
  END;
END;
$$ LANGUAGE plpgsql;

create or replace function validate_message_body (message_body jsonb) returns boolean as $$
select extensions.jsonb_matches_schema(
  schema := '
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "const": "root"
    },
    "children": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Paragraph"
      }
    }
  },
  "required": [
    "type",
    "children"
  ],
  "definitions": {
    "Paragraph": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "paragraph"
        },
        "children": {
          "type": "array",
          "items": {
            "oneOf": [
              {
                "$ref": "#/definitions/Text"
              },
              {
                "$ref": "#/definitions/Link"
              },
              {
                "$ref": "#/definitions/Hashtag"
              },
              {
                "$ref": "#/definitions/User"
              },
              {
                "$ref": "#/definitions/Emoji"
              }
            ]
          }
        }
      },
      "required": [
        "type",
        "children"
      ]
    },
    "Text": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "text"
        },
        "text": {
          "type": "string"
        },
        "format": {
          "type": "number"
        }
      },
      "required": [
        "type",
        "text",
        "format"
      ]
    },
    "Link": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "link"
        },
        "url": {
          "type": "string"
        },
        "target": {
          "type": "string"
        },
        "rel": {
          "type": "string"
        },
        "children": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/Text"
          }
        }
      },
      "required": [
        "type",
        "url",
        "target",
        "rel",
        "children"
      ]
    },
    "Hashtag": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "hashtag"
        },
        "text": {
          "type": "string"
        },
        "format": {
          "type": "number"
        }
      },
      "required": [
        "type",
        "text",
        "format"
      ]
    },
    "User": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "user"
        },
        "text": {
          "type": "string"
        },
        "format": {
          "type": "number"
        },
        "id": {
          "type": "string"
        },
        "username": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "text",
        "format",
        "id",
        "username"
      ]
    },
    "Emoji": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "emoji"
        },
        "text": {
          "type": "string"
        },
        "unicode": {
          "type": "string"
        },
        "label": {
          "type": "string"
        }
      },
      "required": [
        "text",
        "unicode",
        "label"
      ]
    }
  }
}',
  instance := message_body
);
$$ language sql stable security definer;
