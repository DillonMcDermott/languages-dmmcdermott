-- db/init.sql
CREATE TABLE game_sessions (
    id SERIAL PRIMARY KEY,
    number_to_guess INTEGER NOT NULL,
    current_guess INTEGER
);