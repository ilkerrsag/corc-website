-- What the message is about: tasting, pricing, product, press or other. The
-- tasting page sends nothing, so its rows carry the default and keep reading
-- the way they always did.
ALTER TABLE submissions ADD COLUMN topic TEXT NOT NULL DEFAULT 'tasting';
