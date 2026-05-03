-- Run this in your Supabase SQL Editor
-- Engagement tracking for the exemplar-based feedback loop.
--
-- Approach: when generating new content, the app pulls the top-performing
-- past posts for the same platform + topic and injects them into the prompt
-- as few-shot exemplars. The LLM imitates patterns from winners. No discrete
-- axes, no bandit, no enums — just "show me what worked."
--
-- This migration adds the snapshot table that ingest crons (Meta App Review,
-- GA4) will populate, plus a small audit table. The query that picks
-- exemplars at generation time joins content_items + engagement_snapshots
-- live; no materialized view needed at this scale.

-- 1. Time-series of engagement metrics. One row per (post, capture time).
--    Snapshots, not running totals, so we can compare posts at the same age
--    when computing engagement scores.
CREATE TABLE IF NOT EXISTS engagement_snapshots (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_item_id     UUID REFERENCES content_items(id) ON DELETE CASCADE,
  platform            TEXT NOT NULL,
  captured_at         TIMESTAMPTZ DEFAULT NOW(),
  hours_since_post    NUMERIC,

  impressions         INTEGER,
  reach               INTEGER,
  clicks              INTEGER,
  saves               INTEGER,
  shares              INTEGER,
  reactions           INTEGER,
  comments            INTEGER,
  opens               INTEGER,
  unsubscribes        INTEGER,

  raw                 JSONB
);

CREATE INDEX IF NOT EXISTS engagement_snapshots_item_idx
  ON engagement_snapshots(content_item_id, captured_at);
CREATE INDEX IF NOT EXISTS engagement_snapshots_platform_idx
  ON engagement_snapshots(platform, captured_at);

-- 2. Audit log for nightly ingest runs. Cheap to keep, saves debugging time.
CREATE TABLE IF NOT EXISTS engagement_ingest_runs (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform            TEXT NOT NULL,
  started_at          TIMESTAMPTZ DEFAULT NOW(),
  finished_at         TIMESTAMPTZ,
  posts_seen          INTEGER,
  snapshots_written   INTEGER,
  error               TEXT
);

CREATE INDEX IF NOT EXISTS engagement_ingest_runs_platform_idx
  ON engagement_ingest_runs(platform, started_at);

-- Exemplar selection is a live query at generation time, roughly:
--
--   WITH platform_engagement AS (
--     SELECT ci.id, ci.platform, ci.topic, ci.content,
--       (COALESCE(es.reactions,0) + COALESCE(es.saves,0) + COALESCE(es.shares,0) + COALESCE(es.comments,0))::FLOAT
--         / NULLIF(es.impressions, 0) AS engagement_rate
--     FROM content_items ci
--     JOIN LATERAL (
--       SELECT * FROM engagement_snapshots
--       WHERE content_item_id = ci.id AND hours_since_post >= 48
--       ORDER BY ABS(hours_since_post - 72) LIMIT 1
--     ) es ON TRUE
--     WHERE ci.status = 'published'
--   ),
--   medians AS (
--     SELECT platform, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY engagement_rate) AS median
--     FROM platform_engagement GROUP BY platform
--   )
--   SELECT pe.*, pe.engagement_rate / NULLIF(m.median, 0) AS engagement_score
--   FROM platform_engagement pe
--   JOIN medians m ON m.platform = pe.platform
--   WHERE pe.platform = $1 AND pe.topic = $2
--   ORDER BY engagement_score DESC NULLS LAST
--   LIMIT $3;
--
-- The actual implementation lands in api/db/exemplars.js (not yet built —
-- gated on ingest pipelines populating engagement_snapshots).
