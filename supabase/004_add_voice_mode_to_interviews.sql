-- Run this in your Supabase SQL Editor
-- Adds voice mode to interviews table.
-- 'practice' = clinic voice (current behavior, scrub "I" → "we at <brand>")
-- 'personal' = clinician's first-person voice (preserve "I", append signature)

ALTER TABLE interviews ADD COLUMN IF NOT EXISTS voice_mode TEXT DEFAULT 'practice';
