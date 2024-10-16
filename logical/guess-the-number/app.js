// File: app.js

const express = require('express');
const { Pool } =  require('pg');
require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

app.post('/start', async (req, res) => {
    const numberToGuess = Math.floor(Math.random() * 100) + 1;
});