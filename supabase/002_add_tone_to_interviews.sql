-- Run this in your Supabase SQL Editor
-- Adds tone preference to interviews table

ALTER TABLE interviews ADD COLUMN IF NOT EXISTS tone TEXT DEFAULT 'smart';
