// public/script.js
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('guessForm').addEventListener('submit', submitGuess);

let gameId = null;

async function startGame() {
    const response = await fetch('/start', { method: 'POST' });
    const game = await response.json();
    gameId = game.id;

    document.getElementById('gameStatus').innerText = 'New game started! You have 10 attempts.';
    document.getElementById('guessForm').style.display = 'block';
}

async function submitGuess(e) {
    e.preventDefault();
    const guess = document.getElementById('guessInput').value;
    
    const response = await fetch(`/guess/${gameId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess: parseInt(guess) })
    });
    const result = await response.json();

    if (result.message === 'Correct! You win!') {
        document.getElementById('gameStatus').innerText = `You guessed correctly! The number was ${guess}.`;
        document.getElementById('guessForm').style.display = 'none';
    } else {
        document.getElementById('gameStatus').innerText = `${result.message} Attempts left: ${result.attemptsLeft}`;
        if (result.attemptsLeft <= 0) {
            document.getElementById('gameStatus').innerText = 'Game over! You ran out of attempts.';
            document.getElementById('guessForm').style.display = 'none';
        }
    }
}
