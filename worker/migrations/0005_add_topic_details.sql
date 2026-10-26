-- The two topics that need more than a message to be answered properly: a
-- pricing enquiry wants the format and a rough quantity, a press enquiry wants
-- the outlet. Every other topic leaves these empty.
ALTER TABLE submissions ADD COLUMN format TEXT NOT NULL DEFAULT '';
ALTER TABLE submissions ADD COLUMN volume TEXT NOT NULL DEFAULT '';
ALTER TABLE submissions ADD COLUMN outlet TEXT NOT NULL DEFAULT '';
