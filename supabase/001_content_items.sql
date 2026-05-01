-- Run this in your Supabase SQL Editor
-- Supabase Dashboard → SQL Editor → New Query → paste → Run

CREATE TABLE IF NOT EXISTS content_items (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  interview_id    UUID REFERENCES interviews(id) ON DELETE CASCADE,
  clinician_id    UUID REFERENCES clinicians(id) ON DELETE CASCADE,
  clinician_name  TEXT,
  topic           TEXT,
  platform        TEXT NOT NULL,  -- blog | instagram | facebook | linkedin | pinterest | gbp | google_ads | landing_page | video_script | email
  content         TEXT NOT NULL,
  status          TEXT DEFAULT 'draft',  -- draft | in_review | approved | scheduled | published
  scheduled_at    TIMESTAMPTZ,
  published_at    TIMESTAMPTZ,
  media_urls      JSONB DEFAULT '[]',    -- [{ url, name, type, driveId }]
  platform_post_id TEXT,                -- returned ID from FB/Buffer after posting
  buffer_update_id TEXT,
  reviewed_by     TEXT,
  approved_by     TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS content_items_status_idx       ON content_items(status);
CREATE INDEX IF NOT EXISTS content_items_platform_idx     ON content_items(platform);
CREATE INDEX IF NOT EXISTS content_items_interview_id_idx ON content_items(interview_id);
CREATE INDEX IF NOT EXISTS content_items_scheduled_at_idx ON content_items(scheduled_at);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_content_items_updated_at ON content_items;
CREATE TRIGGER update_content_items_updated_at
  BEFORE UPDATE ON content_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
