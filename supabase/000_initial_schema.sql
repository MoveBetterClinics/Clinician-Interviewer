-- Run this in your Supabase SQL Editor BEFORE 001_content_items.sql.
-- Supabase Dashboard → SQL Editor → New Query → paste → Run
--
-- Bootstrap schema for a fresh NarrateRx deployment (any brand).
-- The original people-brand Supabase project predates these checked-in
-- migrations, so this file captures the base tables (clinicians, interviews,
-- clinic_settings) that 001 and later migrations build on. All statements
-- are idempotent — safe to re-run.

-- ── clinicians ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clinicians (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name              TEXT NOT NULL,
  created_by_id     TEXT,
  created_by_email  TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS clinicians_name_idx          ON clinicians(name);
CREATE INDEX IF NOT EXISTS clinicians_created_by_id_idx ON clinicians(created_by_id);

-- ── interviews ───────────────────────────────────────────────────────────────
-- `tone` is added by 002_add_tone_to_interviews.sql; included here for fresh
-- installs to land on the current shape in one shot.
CREATE TABLE IF NOT EXISTS interviews (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clinician_id  UUID REFERENCES clinicians(id) ON DELETE CASCADE,
  topic         TEXT,
  status        TEXT DEFAULT 'in_progress',  -- in_progress | completed
  messages      JSONB DEFAULT '[]',
  outputs       JSONB,
  owner_id      TEXT,
  owner_email   TEXT,
  tone          TEXT DEFAULT 'smart',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS interviews_clinician_id_idx ON interviews(clinician_id);
CREATE INDEX IF NOT EXISTS interviews_status_idx       ON interviews(status);
CREATE INDEX IF NOT EXISTS interviews_topic_idx        ON interviews(topic);
CREATE INDEX IF NOT EXISTS interviews_owner_id_idx     ON interviews(owner_id);

-- ── clinic_settings ──────────────────────────────────────────────────────────
-- Single-row table keyed by id='default'. Holds the campaign mode/notes the
-- Strategy page edits.
CREATE TABLE IF NOT EXISTS clinic_settings (
  id              TEXT PRIMARY KEY,
  campaign_mode   TEXT,
  campaign_notes  TEXT,
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_by      TEXT
);

INSERT INTO clinic_settings (id, campaign_mode, campaign_notes)
VALUES ('default', 'bookings', '')
ON CONFLICT (id) DO NOTHING;
