alter table "public"."messages" drop constraint "messages_embeddedType_check";

alter table "public"."messages" add constraint "messages_embeddedType_check" CHECK ((("embeddedType" = 'images'::text) OR ("embeddedType" = 'videos'::text) OR ("embeddedType" = 'link'::text))) not valid;

alter table "public"."messages" validate constraint "messages_embeddedType_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.calculate_lexical_text_length(lexical_node jsonb, result_length integer DEFAULT 0)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$DECLARE
  result int;
BEGIN
  return CASE lexical_node ->> 'type'
      WHEN 'root' THEN process_lexical_node_with_children(lexical_node, result_length)
      WHEN 'paragraph' THEN process_lexical_node_with_children(lexical_node, result_length)
      WHEN 'link' THEN process_lexical_node_with_children(lexical_node, result_length)
      WHEN 'autolink' THEN process_lexical_node_with_children(lexical_node, result_length)
      WHEN 'text' THEN length(lexical_node ->> 'text')
      WHEN 'user' THEN length(lexical_node ->> 'text')
      WHEN 'hashtag' THEN length(lexical_node ->> 'text')
      WHEN 'emoji' THEN length(lexical_node ->> 'text')
      ELSE 0
  END;
END;$function$
;

CREATE OR REPLACE FUNCTION public.validate_message_body(message_body jsonb)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$select extensions.jsonb_matches_schema(
  schema := '
{
  "type": "object",
  "properties": {
    "type": { "type": "string", "const": "root" },
    "children": {
      "type": "array",
      "items": { "$ref": "#/definitions/Paragraph" }
    }
  },
  "required": ["type", "children"],
  "definitions": {
    "Paragraph": {
      "type": "object",
      "properties": {
        "type": { "type": "string", "const": "paragraph" },
        "children": {
          "type": "array",
          "items": {
            "oneOf": [
              { "$ref": "#/definitions/Text" },
              { "$ref": "#/definitions/Link" },
              { "$ref": "#/definitions/Autolink" },
              { "$ref": "#/definitions/Hashtag" },
              { "$ref": "#/definitions/User" },
              { "$ref": "#/definitions/Emoji" }
            ]
          }
        }
      },
      "required": ["type", "children"]
    },
    "Text": {
      "type": "object",
      "properties": {
        "type": { "type": "string", "const": "text" },
        "text": { "type": "string" },
        "format": { "type": "number" }
      },
      "required": ["type", "text", "format"]
    },
    "Link": {
      "type": "object",
      "properties": {
        "type": { "type": "string", "const": "link" },
        "url": { "type": "string" },
        "children": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/Text"
          }
        }
      },
      "required": ["type", "url", "children"]
    },
    "Autolink": {
      "type": "object",
      "properties": {
        "type": { "type": "string", "const": "autolink" },
        "url": { "type": "string" },
        "children": {
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/Text"
          }
        }
      },
      "required": ["type", "url", "children"]
    },
    "Hashtag": {
      "type": "object",
      "properties": {
        "type": { "type": "string", "const": "hashtag" },
        "text": { "type": "string" },
        "format": { "type": "number" }
      },
      "required": ["type", "text", "format"]
    },
    "User": {
      "type": "object",
      "properties": {
        "type": { "type": "string", "const": "user" },
        "text": { "type": "string" },
        "format": { "type": "number" },
        "id": { "type": "string" },
        "username": { "type": "string" }
      },
      "required": ["type", "text", "format", "id", "username"]
    },
    "Emoji": {
      "type": "object",
      "properties": {
        "type": { "type": "string", "const": "emoji" },
        "text": { "type": "string" },
        "unicode": { "type": "string" },
        "label": { "type": "string" }
      },
      "required": ["type", "text", "unicode", "label"]
    }
  }
}',
  instance := message_body
);$function$
;


