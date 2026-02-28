alter table "public"."messages" drop constraint "messages_embeddedType_check";

alter table "public"."messages" add constraint "messages_embeddedType_check" CHECK ((("embeddedType" = 'images'::text) OR ("embeddedType" = 'videos'::text) OR ("embeddedType" = 'link'::text) OR ("embeddedType" = 'youtube'::text))) not valid;

alter table "public"."messages" validate constraint "messages_embeddedType_check";


