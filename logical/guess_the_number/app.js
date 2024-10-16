// app.js
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
  user: 'yourusername',
  host: 'db',
  database: 'guess_the_number',
  password: 'yourpassword',
  port: 5432,
});

// Start a new game
app.post('/start', async (req, res) => {
  const result = await pool.query('INSERT INTO game_sessions (number_to_guess) VALUES (FLOOR(RANDOM() * 100 + 1)) RETURNING *');
  res.json(result.rows[0]);
});

// Make a guess
app.post('/guess/:id', async (req, res) => {
  const { id, guess } = req.body;
  try {
    const gameResult = await pool.query('SELECT number_to_guess, attempts FROM game_sessions WHERE id = $1', [id]);
    if (gameResult.rowCount === 0) {
      return res.status(404).send('Game not found');
    }
    const { number, attempts } = gameResult.rows[0];
    const newAttempts = attempts + 1;

    if (guess === number) {
      res.json({ message: 'Correct!', attempts: newAttempts });
      // Optionally, delete the game after it's won
      await pool.query('DELETE FROM game_sessions WHERE id = $1', [id]);
    } else {
      res.json({ message: guess < number ? 'Too low!' : 'Too high!', attempts: newAttempts });
      await pool.query('UPDATE game_sessions SET attempts = $1 WHERE id = $2', [newAttempts, id]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
