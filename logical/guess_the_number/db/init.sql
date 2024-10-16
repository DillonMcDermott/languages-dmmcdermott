-- db/init.sql
CREATE TABLE IF NOT EXIST game_sessions (
    id SERIAL PRIMARY KEY,
    number_to_guess INTEGER NOT NULL,
    current_guess INTEGER
);

INSERT INTO games (number) VALUES (FLOOR(RANDOM() * 100 + 1));
-- Random number 1-100