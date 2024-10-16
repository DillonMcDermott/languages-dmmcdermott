-- db/init.sql
CREATE TABLE IF NOT EXISTS game_sessions (
    id SERIAL PRIMARY KEY,
    number_to_guess INTEGER NOT NULL,
    current_guess INTEGER
    attemps INTEGER DEFAULT 0
);

INSERT INTO game_sessions (number) VALUES (FLOOR(RANDOM() * 100 + 1));
-- Random number 1-100