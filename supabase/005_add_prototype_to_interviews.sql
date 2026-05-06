-- Add optional patient prototype field to interviews.
-- Stores the selected archetype id (e.g. 'reconnect', 'retain', 'excel').
-- Null means no prototype was selected — behavior is identical to previous.
ALTER TABLE interviews ADD COLUMN IF NOT EXISTS prototype text;
