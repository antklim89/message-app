drop view if exists "public"."profiles_view";

alter table "public"."reports" add column "category" text not null;

alter table "public"."reports" add constraint "reports_category_check" CHECK ((length(category) <= 100)) not valid;

alter table "public"."reports" validate constraint "reports_category_check";

create or replace view "public"."profiles_view" as  SELECT id,
    created,
    avatar,
    bio,
    username,
    displayname,
    (EXISTS ( SELECT f."authorId"
           FROM public.followers f
          WHERE ((f."authorId" = auth.uid()) AND (f."followerId" = p.id)))) AS "isFollowing",
    (EXISTS ( SELECT f."followerId"
           FROM public.followers f
          WHERE ((f."followerId" = auth.uid()) AND (f."authorId" = p.id)))) AS "isFollower",
    ( SELECT count(1) AS count
           FROM public.followers f
          WHERE (f."followerId" = p.id)) AS "followersCount",
    ( SELECT count(1) AS count
           FROM public.followers f
          WHERE (f."authorId" = p.id)) AS "followingsCount",
    ( SELECT count(1) AS count
           FROM public.favorites f
          WHERE (f."authorId" = auth.uid())) AS "favoritesCount",
    ( SELECT count(1) AS count
           FROM public.messages m
          WHERE (m."authorId" = p.id)) AS "messagesCount"
   FROM public.profiles p;



