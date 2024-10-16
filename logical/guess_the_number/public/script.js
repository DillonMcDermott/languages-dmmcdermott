// public/script.js
let gameId;

async function startNewGame() {
  const response = await fetch('/api/new-game');
  const game = await response.json();
  gameId = game.id;
  alert('New game started! Guess a number between 1 and 100.');
}

async function submitGuess() {
  const guess = parseInt(document.getElementById('guessInput').value);
  const response = await fetch('/api/guess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: gameId, guess })
  });
  const result = await response.json();
  alert(result.message);
}

document.getElementById('startButton').addEventListener('click', startNewGame);
document.getElementById('submitGuessButton').addEventListener('click', submitGuess);
