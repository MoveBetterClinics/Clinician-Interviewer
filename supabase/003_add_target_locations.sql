-- Run this in your Supabase SQL Editor
-- Supabase Dashboard → SQL Editor → New Query → paste → Run

-- GBP scheduled posts go through the internal queue (api/cron/publish-due) since
-- Google's localPosts API has no native scheduling. When the user picks specific
-- locations on a future-scheduled GBP post, we need to remember those choices
-- until the cron dispatches the post. NULL means "all configured locations".
ALTER TABLE content_items ADD COLUMN IF NOT EXISTS target_locations JSONB;
