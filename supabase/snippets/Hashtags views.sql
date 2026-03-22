create or replace view hashtags_month_top_view
with
  (security_invoker = on) as
select
  hashtag as hashtag,
  count(*) as count
from
  hashtags
where
  date >= date_trunc('day', now() - '1 month'::interval)
group by
  hashtag
order by
  count desc
limit
  20;

create or replace view hashtags_week_top_view
with
  (security_invoker = on) as
select
  hashtag as hashtag,
  count(*) as count
from
  hashtags
where
  date >= date_trunc('day', now() - '1 week'::interval)
group by
  hashtag
order by
  count desc
limit
  20;