create or replace view hashtags_month_top_view
with
  (security_invoker = on) as
select
  hashtag,
  count(*) as count
from
  hashtags
-- where
--   date >= date_trunc('day', now() - '1 month'::interval)
group by
  hashtag;

create or replace view hashtags_week_top_view
with
  (security_invoker = on) as
select
  hashtag,
  count(*) as count
from
  hashtags
where
  date >= date_trunc('day', now() - '1 week'::interval)
group by
  hashtag;

-- drop VIEW hashtags_view;