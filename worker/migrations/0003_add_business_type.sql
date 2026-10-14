-- Which kind of business is asking: bar, caterer, hotel, company or other.
-- Rows written before this column existed keep an empty string.
ALTER TABLE submissions ADD COLUMN business_type TEXT NOT NULL DEFAULT '';
