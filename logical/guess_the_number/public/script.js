// public/script.js
let gameId;

async function startNewGame() {
  const response = await fetch('/start');
  const game = await response.json();
  gameId = game.id;
  alert('New game started! Guess a number between 1 and 100.');
  document.getElementById('guessForm').style.display = 'block';
}

document.getElementById('startGame').addEventListener('click', startNewGame);
document.getElementById('guessForm').addEventListener('submit', submitGuess);

async function submitGuess(event) {
  event.preventDefault();
  const guess = parseInt(document.getElementById('guessInput').value);
  const response = await fetch('/guess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: gameId, guess })
  });
  const result = await response.json();
  alert(result.message);
}
