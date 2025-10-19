


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_jsonschema" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."calculate_lexical_text_length"("lexical_node" "jsonb", "result_length" integer DEFAULT 0) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
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
      WHEN 'user' THEN length(lexical_node ->> 'text')
      WHEN 'emoji' THEN length(lexical_node ->> 'text')
      ELSE 0
  END;
END;
$$;


ALTER FUNCTION "public"."calculate_lexical_text_length"("lexical_node" "jsonb", "result_length" integer) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "created" timestamp with time zone DEFAULT "now"() NOT NULL,
    "username" "text" DEFAULT ''::"text" NOT NULL,
    "avatar" "text" DEFAULT ''::"text",
    "bio" "text" DEFAULT ''::"text" NOT NULL,
    "displayname" "text" DEFAULT ''::"text" NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."favorites_count"("public"."profiles") RETURNS bigint
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
select count(1) from favorites where "authorId" = auth.uid()
$$;


ALTER FUNCTION "public"."favorites_count"("public"."profiles") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."followers_count"("public"."profiles") RETURNS bigint
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$
select count(1) from followers where "followerId" = $1.id
$_$;


ALTER FUNCTION "public"."followers_count"("public"."profiles") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."followings_count"("public"."profiles") RETURNS bigint
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$
select count(1) from followers where "authorId" = $1.id
$_$;


ALTER FUNCTION "public"."followings_count"("public"."profiles") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $_$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    json_value(new.raw_user_meta_data, '$.username' default 'anon' on empty)
  );
  return new;
end;
$_$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_follower"("public"."profiles") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$
select auth.uid() = (select "followerId" from followers where "followerId" = auth.uid() and "authorId" = $1.id)
$_$;


ALTER FUNCTION "public"."is_follower"("public"."profiles") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_following"("public"."profiles") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$
select auth.uid() = (select "authorId" from followers where "authorId" = auth.uid() and "followerId" = $1.id)
$_$;


ALTER FUNCTION "public"."is_following"("public"."profiles") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_message_body"("message_body" "jsonb") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$
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
        "text": {
          "type": "string"
        },
        "children": {
          "type": "array",
          "minItems": 1,
          "maxItems": 1,
          "items": {
            "$ref": "#/definitions/Text"
          }
        }
      },
      "required": [
        "type",
        "text",
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
$_$;


ALTER FUNCTION "public"."validate_message_body"("message_body" "jsonb") OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" bigint NOT NULL,
    "created" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated" timestamp without time zone DEFAULT "now"() NOT NULL,
    "authorId" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "answerId" bigint,
    "body" "jsonb" NOT NULL,
    CONSTRAINT "messages_body_check" CHECK ((("public"."calculate_lexical_text_length"("body") < 600) AND "public"."validate_message_body"("body")))
);


ALTER TABLE "public"."messages" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."message_has_liked"("public"."messages") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$
select auth.uid() = (select "authorId" from likes where "authorId" = auth.uid() and "messageId" = $1.id)
$_$;


ALTER FUNCTION "public"."message_has_liked"("public"."messages") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."message_in_favorite"("public"."messages") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$
select auth.uid() = (select "authorId" from favorites where "authorId" = auth.uid() and "messageId" = $1.id)
$_$;


ALTER FUNCTION "public"."message_in_favorite"("public"."messages") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."message_likes_count"("public"."messages") RETURNS bigint
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$
select count(1) from likes where "messageId" = $1.id
$_$;


ALTER FUNCTION "public"."message_likes_count"("public"."messages") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."messages_count"("public"."profiles") RETURNS bigint
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$
select count(1) from messages where "authorId" = $1.id
$_$;


ALTER FUNCTION "public"."messages_count"("public"."profiles") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."process_lexical_node_with_children"("lexical_node" "jsonb", "result_length" integer DEFAULT 0) RETURNS integer
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    lexical_node_child jsonb;
BEGIN
  FOR lexical_node_child IN SELECT * FROM jsonb_array_elements((lexical_node -> 'children'))
  LOOP
      result_length := result_length + calculate_lexical_text_length(lexical_node_child, result_length);
  END LOOP;

  return result_length;
END;
$$;


ALTER FUNCTION "public"."process_lexical_node_with_children"("lexical_node" "jsonb", "result_length" integer) OWNER TO "postgres";


ALTER TABLE "public"."messages" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."Messages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."favorites" (
    "authorId" "uuid" NOT NULL,
    "messageId" bigint NOT NULL
);


ALTER TABLE "public"."favorites" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."followers" (
    "authorId" "uuid" NOT NULL,
    "followerId" "uuid" NOT NULL
);


ALTER TABLE "public"."followers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."likes" (
    "authorId" "uuid" NOT NULL,
    "messageId" bigint NOT NULL
);


ALTER TABLE "public"."likes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."reports" (
    "id" bigint NOT NULL,
    "created" timestamp with time zone DEFAULT "now"() NOT NULL,
    "body" "text" DEFAULT ''::"text" NOT NULL,
    "messageId" bigint NOT NULL
);


ALTER TABLE "public"."reports" OWNER TO "postgres";


ALTER TABLE "public"."reports" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."reports_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."favorites"
    ADD CONSTRAINT "favorites_pkey" PRIMARY KEY ("authorId", "messageId");



ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "followers_pkey" PRIMARY KEY ("authorId", "followerId");



ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("authorId", "messageId");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key1" UNIQUE ("username");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key2" UNIQUE ("username");



ALTER TABLE ONLY "public"."reports"
    ADD CONSTRAINT "reports_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "Messages_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."favorites"
    ADD CONSTRAINT "favorites_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."favorites"
    ADD CONSTRAINT "favorites_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."messages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."messages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "public"."messages"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."reports"
    ADD CONSTRAINT "reports_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."messages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "subscribe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "subscribe_subscribeId_fkey" FOREIGN KEY ("followerId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



CREATE POLICY "Enable delete for authors only" ON "public"."favorites" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable delete for authors only" ON "public"."likes" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable delete for authors only" ON "public"."messages" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable insert for all" ON "public"."reports" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable insert for authors only" ON "public"."favorites" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable insert for authors only" ON "public"."likes" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable insert for authors only" ON "public"."messages" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable read access for all users" ON "public"."messages" FOR SELECT USING (true);



CREATE POLICY "Enable select for all" ON "public"."favorites" FOR SELECT USING (true);



CREATE POLICY "Enable select for all" ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Enable update for authors only" ON "public"."messages" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "authorId")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable update for owners only" ON "public"."profiles" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



ALTER TABLE "public"."favorites" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."likes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."messages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."reports" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";





































































































































































GRANT ALL ON FUNCTION "public"."calculate_lexical_text_length"("lexical_node" "jsonb", "result_length" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_lexical_text_length"("lexical_node" "jsonb", "result_length" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_lexical_text_length"("lexical_node" "jsonb", "result_length" integer) TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON FUNCTION "public"."favorites_count"("public"."profiles") TO "anon";
GRANT ALL ON FUNCTION "public"."favorites_count"("public"."profiles") TO "authenticated";
GRANT ALL ON FUNCTION "public"."favorites_count"("public"."profiles") TO "service_role";



GRANT ALL ON FUNCTION "public"."followers_count"("public"."profiles") TO "anon";
GRANT ALL ON FUNCTION "public"."followers_count"("public"."profiles") TO "authenticated";
GRANT ALL ON FUNCTION "public"."followers_count"("public"."profiles") TO "service_role";



GRANT ALL ON FUNCTION "public"."followings_count"("public"."profiles") TO "anon";
GRANT ALL ON FUNCTION "public"."followings_count"("public"."profiles") TO "authenticated";
GRANT ALL ON FUNCTION "public"."followings_count"("public"."profiles") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_follower"("public"."profiles") TO "anon";
GRANT ALL ON FUNCTION "public"."is_follower"("public"."profiles") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_follower"("public"."profiles") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_following"("public"."profiles") TO "anon";
GRANT ALL ON FUNCTION "public"."is_following"("public"."profiles") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_following"("public"."profiles") TO "service_role";



GRANT ALL ON FUNCTION "public"."validate_message_body"("message_body" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."validate_message_body"("message_body" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."validate_message_body"("message_body" "jsonb") TO "service_role";



GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";



GRANT ALL ON FUNCTION "public"."message_has_liked"("public"."messages") TO "anon";
GRANT ALL ON FUNCTION "public"."message_has_liked"("public"."messages") TO "authenticated";
GRANT ALL ON FUNCTION "public"."message_has_liked"("public"."messages") TO "service_role";



GRANT ALL ON FUNCTION "public"."message_in_favorite"("public"."messages") TO "anon";
GRANT ALL ON FUNCTION "public"."message_in_favorite"("public"."messages") TO "authenticated";
GRANT ALL ON FUNCTION "public"."message_in_favorite"("public"."messages") TO "service_role";



GRANT ALL ON FUNCTION "public"."message_likes_count"("public"."messages") TO "anon";
GRANT ALL ON FUNCTION "public"."message_likes_count"("public"."messages") TO "authenticated";
GRANT ALL ON FUNCTION "public"."message_likes_count"("public"."messages") TO "service_role";



GRANT ALL ON FUNCTION "public"."messages_count"("public"."profiles") TO "anon";
GRANT ALL ON FUNCTION "public"."messages_count"("public"."profiles") TO "authenticated";
GRANT ALL ON FUNCTION "public"."messages_count"("public"."profiles") TO "service_role";



GRANT ALL ON FUNCTION "public"."process_lexical_node_with_children"("lexical_node" "jsonb", "result_length" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."process_lexical_node_with_children"("lexical_node" "jsonb", "result_length" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."process_lexical_node_with_children"("lexical_node" "jsonb", "result_length" integer) TO "service_role";


















GRANT ALL ON SEQUENCE "public"."Messages_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Messages_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Messages_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."favorites" TO "anon";
GRANT ALL ON TABLE "public"."favorites" TO "authenticated";
GRANT ALL ON TABLE "public"."favorites" TO "service_role";



GRANT ALL ON TABLE "public"."followers" TO "anon";
GRANT ALL ON TABLE "public"."followers" TO "authenticated";
GRANT ALL ON TABLE "public"."followers" TO "service_role";



GRANT ALL ON TABLE "public"."likes" TO "anon";
GRANT ALL ON TABLE "public"."likes" TO "authenticated";
GRANT ALL ON TABLE "public"."likes" TO "service_role";



GRANT ALL ON TABLE "public"."reports" TO "anon";
GRANT ALL ON TABLE "public"."reports" TO "authenticated";
GRANT ALL ON TABLE "public"."reports" TO "service_role";



GRANT ALL ON SEQUENCE "public"."reports_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."reports_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."reports_id_seq" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































RESET ALL;
