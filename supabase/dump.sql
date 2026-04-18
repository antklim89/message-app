


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


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE SCHEMA IF NOT EXISTS "utils";


ALTER SCHEMA "utils" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_jsonschema" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "utils"."calculate_lexical_text_length"("lexical_node" "jsonb") RETURNS integer
    LANGUAGE "plpgsql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
DECLARE
  acc int = 0;
  lexical_node_child jsonb;
  type text := lexical_node ->> 'type';
BEGIN
  if type = 'root' or type = 'paragraph' or type = 'link' or type = 'autolink' then
    for lexical_node_child IN select * from jsonb_array_elements((lexical_node -> 'children'))
    LOOP acc := acc + utils.calculate_lexical_text_length(lexical_node_child);
    end LOOP;

    return acc;

  elsif type = 'hashtag' or type = 'text' or type = 'user' or type = 'emoji' then
    return length(lexical_node ->> 'text');
  end if;

  return 0;
END;
$$;


ALTER FUNCTION "utils"."calculate_lexical_text_length"("lexical_node" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "utils"."extract_and_insert_hashtags"("lexical_node" "jsonb", "result" "text" DEFAULT ''::"text") RETURNS "text"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
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
$$;


ALTER FUNCTION "utils"."extract_and_insert_hashtags"("lexical_node" "jsonb", "result" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "utils"."handle_new_message"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
BEGIN
  new.body_tsvector = to_tsvector('english', utils.extract_and_insert_hashtags(new.body));
  return new;
END;
$$;


ALTER FUNCTION "utils"."handle_new_message"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "utils"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $_$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    json_value(new.raw_user_meta_data, '$.username' default 'anon_'||gen_random_uuid() on empty)
  );
  return new;
end;
$_$;


ALTER FUNCTION "utils"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "utils"."validate_message_body"("message_body" "jsonb") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$ select extensions.jsonb_matches_schema(
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
);$_$;


ALTER FUNCTION "utils"."validate_message_body"("message_body" "jsonb") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."favorites" (
    "authorId" "uuid" NOT NULL,
    "messageId" "uuid" NOT NULL
);


ALTER TABLE "public"."favorites" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."followers" (
    "authorId" "uuid" NOT NULL,
    "followerId" "uuid" NOT NULL
);


ALTER TABLE "public"."followers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "created" timestamp with time zone DEFAULT "now"() NOT NULL,
    "username" "text" DEFAULT ''::"text" NOT NULL,
    "avatar" "text" DEFAULT ''::"text",
    "bio" "text" DEFAULT ''::"text" NOT NULL,
    "displayname" "text" DEFAULT ''::"text" NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."followers_view" WITH ("security_invoker"='on') AS
 SELECT "f"."followerId",
    "f"."authorId",
    "p"."username",
    "p"."avatar",
    (EXISTS ( SELECT 1
           FROM "public"."followers"
          WHERE (("followers"."authorId" = "auth"."uid"()) AND ("followers"."followerId" = "p"."id")))) AS "isFollowing"
   FROM ("public"."followers" "f"
     JOIN "public"."profiles" "p" ON (("p"."id" = "f"."authorId")));


ALTER VIEW "public"."followers_view" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."hashtags" (
    "id" bigint NOT NULL,
    "date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "hashtag" "text" NOT NULL
);


ALTER TABLE "public"."hashtags" OWNER TO "postgres";


ALTER TABLE "public"."hashtags" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."hashtags_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE OR REPLACE VIEW "public"."hashtags_month_top_view" WITH ("security_invoker"='on') AS
 SELECT "hashtag",
    "count"(*) AS "count"
   FROM "public"."hashtags"
  WHERE ("date" >= "date_trunc"('day'::"text", ("now"() - '1 mon'::interval)))
  GROUP BY "hashtag"
  ORDER BY ("count"(*)) DESC
 LIMIT 20;


ALTER VIEW "public"."hashtags_month_top_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."hashtags_week_top_view" WITH ("security_invoker"='on') AS
 SELECT "hashtag",
    "count"(*) AS "count"
   FROM "public"."hashtags"
  WHERE ("date" >= "date_trunc"('day'::"text", ("now"() - '7 days'::interval)))
  GROUP BY "hashtag"
  ORDER BY ("count"(*)) DESC
 LIMIT 20;


ALTER VIEW "public"."hashtags_week_top_view" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."likes" (
    "authorId" "uuid" NOT NULL,
    "messageId" "uuid" NOT NULL
);


ALTER TABLE "public"."likes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v1mc"() NOT NULL,
    "created" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated" timestamp without time zone DEFAULT "now"() NOT NULL,
    "authorId" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "body" "jsonb" NOT NULL,
    "embeddedItems" "text"[],
    "embeddedType" "text",
    "answerId" "uuid",
    "body_tsvector" "tsvector" NOT NULL,
    CONSTRAINT "messages_body_check" CHECK ((("utils"."calculate_lexical_text_length"("body") < 600) AND "utils"."validate_message_body"("body"))),
    CONSTRAINT "messages_embeddedItems_check" CHECK ((("cardinality"("embeddedItems") > 0) AND ("cardinality"("embeddedItems") <= 4))),
    CONSTRAINT "messages_embeddedType_check" CHECK ((("embeddedType" = 'images'::"text") OR ("embeddedType" = 'videos'::"text") OR ("embeddedType" = 'link'::"text") OR ("embeddedType" = 'youtube'::"text")))
);


ALTER TABLE "public"."messages" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."messages_view" WITH ("security_invoker"='on') AS
 SELECT "m"."answerId",
    "m"."authorId",
    "m"."body",
    "m"."created",
    "m"."embeddedItems",
    "m"."embeddedType",
    "m"."id",
    "m"."updated",
    "p"."username",
    "p"."avatar",
    (EXISTS ( SELECT "likes"."messageId"
           FROM "public"."likes"
          WHERE (("likes"."messageId" = "m"."id") AND ("likes"."authorId" = "auth"."uid"())))) AS "hasLiked",
    (EXISTS ( SELECT "favorites"."messageId"
           FROM "public"."favorites"
          WHERE (("favorites"."messageId" = "m"."id") AND ("favorites"."authorId" = "auth"."uid"())))) AS "isFavorite",
    ( SELECT "count"(1) AS "count"
           FROM "public"."likes" "l"
          WHERE ("l"."messageId" = "m"."id")) AS "likesCount",
    ( SELECT "count"(1) AS "count"
           FROM "public"."messages" "a"
          WHERE ("a"."answerId" = "m"."id")) AS "answersCount",
    "m"."body_tsvector"
   FROM ("public"."messages" "m"
     JOIN "public"."profiles" "p" ON (("p"."id" = "m"."authorId")));


ALTER VIEW "public"."messages_view" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."profiles_view" WITH ("security_invoker"='on') AS
 SELECT "id",
    "created",
    "avatar",
    "bio",
    "username",
    "displayname",
    (EXISTS ( SELECT "f"."authorId"
           FROM "public"."followers" "f"
          WHERE (("f"."authorId" = "auth"."uid"()) AND ("f"."followerId" = "p"."id")))) AS "isFollowing",
    (EXISTS ( SELECT "f"."followerId"
           FROM "public"."followers" "f"
          WHERE (("f"."followerId" = "auth"."uid"()) AND ("f"."authorId" = "p"."id")))) AS "isFollower",
    ( SELECT "count"(1) AS "count"
           FROM "public"."followers" "f"
          WHERE ("f"."followerId" = "p"."id")) AS "followersCount",
    ( SELECT "count"(1) AS "count"
           FROM "public"."followers" "f"
          WHERE ("f"."authorId" = "p"."id")) AS "followingsCount",
    ( SELECT "count"(1) AS "count"
           FROM "public"."favorites" "f"
          WHERE ("f"."authorId" = "auth"."uid"())) AS "favoritesCount",
    ( SELECT "count"(1) AS "count"
           FROM "public"."messages" "m"
          WHERE ("m"."authorId" = "p"."id")) AS "messagesCount"
   FROM "public"."profiles" "p";


ALTER VIEW "public"."profiles_view" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."reports" (
    "id" bigint NOT NULL,
    "created" timestamp with time zone DEFAULT "now"() NOT NULL,
    "body" "text" DEFAULT ''::"text" NOT NULL,
    "messageId" "uuid",
    "category" "text" NOT NULL,
    CONSTRAINT "reports_category_check" CHECK (("length"("category") <= 100))
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



ALTER TABLE ONLY "public"."favorites"
    ADD CONSTRAINT "favorites_pkey" PRIMARY KEY ("authorId", "messageId");



ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "followers_pkey" PRIMARY KEY ("authorId", "followerId");



ALTER TABLE ONLY "public"."hashtags"
    ADD CONSTRAINT "hashtags_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("authorId", "messageId");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");



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



CREATE INDEX "body_tsvector_idx" ON "public"."messages" USING "gin" ("body_tsvector");



CREATE INDEX "likes_messageId_idx" ON "public"."likes" USING "btree" ("messageId");



CREATE OR REPLACE TRIGGER "on_message_created" BEFORE INSERT ON "public"."messages" FOR EACH ROW EXECUTE FUNCTION "utils"."handle_new_message"();



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "Messages_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."favorites"
    ADD CONSTRAINT "favorites_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."favorites"
    ADD CONSTRAINT "favorites_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."messages"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."messages"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "public"."messages"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."reports"
    ADD CONSTRAINT "reports_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."messages"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "subscribe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."followers"
    ADD CONSTRAINT "subscribe_subscribeId_fkey" FOREIGN KEY ("followerId") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



CREATE POLICY "Enable delete for authors only" ON "public"."favorites" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable delete for authors only" ON "public"."followers" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable delete for authors only" ON "public"."likes" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable delete for authors only" ON "public"."messages" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable insert for all" ON "public"."reports" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable insert for authors only" ON "public"."favorites" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable insert for authors only" ON "public"."followers" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable insert for authors only" ON "public"."likes" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable insert for authors only" ON "public"."messages" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "authorId"));



CREATE POLICY "Enable read access for all users" ON "public"."hashtags" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."likes" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."messages" FOR SELECT USING (true);



CREATE POLICY "Enable select for all" ON "public"."favorites" FOR SELECT USING (true);



CREATE POLICY "Enable select for all" ON "public"."followers" FOR SELECT USING (true);



CREATE POLICY "Enable select for all" ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Enable update for owners only" ON "public"."profiles" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



ALTER TABLE "public"."favorites" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."followers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."hashtags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."likes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."messages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."reports" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";








GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";





















































































































































































































GRANT ALL ON TABLE "public"."favorites" TO "anon";
GRANT ALL ON TABLE "public"."favorites" TO "authenticated";
GRANT ALL ON TABLE "public"."favorites" TO "service_role";



GRANT ALL ON TABLE "public"."followers" TO "anon";
GRANT ALL ON TABLE "public"."followers" TO "authenticated";
GRANT ALL ON TABLE "public"."followers" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."followers_view" TO "anon";
GRANT ALL ON TABLE "public"."followers_view" TO "authenticated";
GRANT ALL ON TABLE "public"."followers_view" TO "service_role";



GRANT ALL ON TABLE "public"."hashtags" TO "anon";
GRANT ALL ON TABLE "public"."hashtags" TO "authenticated";
GRANT ALL ON TABLE "public"."hashtags" TO "service_role";



GRANT ALL ON SEQUENCE "public"."hashtags_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."hashtags_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."hashtags_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."hashtags_month_top_view" TO "anon";
GRANT ALL ON TABLE "public"."hashtags_month_top_view" TO "authenticated";
GRANT ALL ON TABLE "public"."hashtags_month_top_view" TO "service_role";



GRANT ALL ON TABLE "public"."hashtags_week_top_view" TO "anon";
GRANT ALL ON TABLE "public"."hashtags_week_top_view" TO "authenticated";
GRANT ALL ON TABLE "public"."hashtags_week_top_view" TO "service_role";



GRANT ALL ON TABLE "public"."likes" TO "anon";
GRANT ALL ON TABLE "public"."likes" TO "authenticated";
GRANT ALL ON TABLE "public"."likes" TO "service_role";



GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";



GRANT ALL ON TABLE "public"."messages_view" TO "anon";
GRANT ALL ON TABLE "public"."messages_view" TO "authenticated";
GRANT ALL ON TABLE "public"."messages_view" TO "service_role";



GRANT ALL ON TABLE "public"."profiles_view" TO "anon";
GRANT ALL ON TABLE "public"."profiles_view" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles_view" TO "service_role";



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































