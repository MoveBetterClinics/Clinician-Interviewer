-- Run this in your Supabase SQL Editor
-- Adds patient prototype selection to interviews table.
-- Null = no specific archetype (general content for all patient types).
-- Valid values: 'reconnect', 'retain', 'excel' (people brand).

ALTER TABLE interviews ADD COLUMN IF NOT EXISTS prototype_id TEXT DEFAULT NULL;
