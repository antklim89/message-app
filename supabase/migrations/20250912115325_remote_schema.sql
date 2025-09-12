alter table "public"."profiles" drop constraint "profile_id_fkey";

drop function if exists "public"."compare_uuid"(uuid uuid);

drop function if exists "public"."is_follower_x"(followers);

drop function if exists "public"."is_following_x"(followers);

drop function if exists "public"."test"(followers);

alter table "public"."profiles" add column "displayname" text not null default ''::text;

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX profiles_username_key1 ON public.profiles USING btree (username);

CREATE UNIQUE INDEX profiles_username_key2 ON public.profiles USING btree (username);

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "profiles_username_key1" UNIQUE using index "profiles_username_key1";

alter table "public"."profiles" add constraint "profiles_username_key2" UNIQUE using index "profiles_username_key2";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.favorites_count(profiles)
 RETURNS bigint
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
select count(1) from favorites where "authorId" = auth.uid()
$function$
;

CREATE OR REPLACE FUNCTION public.followers_count(profiles)
 RETURNS bigint
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
select count(1) from followers where "followerId" = $1.id
$function$
;

CREATE OR REPLACE FUNCTION public.followings_count(profiles)
 RETURNS bigint
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
select count(1) from followers where "authorId" = $1.id
$function$
;

CREATE OR REPLACE FUNCTION public.messages_count(profiles)
 RETURNS bigint
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
select count(1) from messages where "authorId" = $1.id
$function$
;


