// game.js

// Data permainan (JSON)
const codingTerms = [
    { term: 'function', type: 'JavaScript', description: 'A block of code designed to perform a task' },
    { term: 'let', type: 'JavaScript', description: 'A keyword used to declare a variable' },
    { term: 'class', type: 'JavaScript', description: 'A blueprint for creating objects' },
    // Add more coding terms as needed
];

// Variabel game
let currentTermIndex = 0;
let score = 0;
let guesses = [];

// UI Elements
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-guess');
const restartButton = document.getElementById('restart-game');

// Fungsi untuk mengatur papan permainan dan reset
function startGame() {
    guesses = [];
    currentTermIndex = Math.floor(Math.random() * codingTerms.length);
    updateGameBoard();
    updateScore();
}

// Fungsi untuk memperbarui papan permainan dengan tebakan pemain
function updateGameBoard() {
    gameBoard.innerHTML = '';
    const currentTerm = codingTerms[currentTermIndex].term;

    for (let i = 0; i < guesses.length; i++) {
        const guessElement = document.createElement('div');
        guessElement.textContent = guesses[i];
        gameBoard.appendChild(guessElement);
    }

    const inputElement = document.createElement('div');
    inputElement.textContent = 'Current Guess: ' + currentTerm;
    gameBoard.appendChild(inputElement);
}

// Fungsi untuk memproses tebakan pemain
function submitGuess() {
    const guess = guessInput.value.trim();
    if (guess === codingTerms[currentTermIndex].term) {
        score += 10;
        currentTermIndex = Math.floor(Math.random() * codingTerms.length);
        guesses.push(guess);
        guessInput.value = '';
        updateGameBoard();
        updateScore();
    } else {
        alert('Incorrect guess. Try again!');
    }
}

// Fungsi untuk memperbarui skor
function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;
}

// Fungsi untuk memulai ulang permainan
function restartGame() {
    score = 0;
    guesses = [];
    startGame();
}

// Event Listeners
submitButton.addEventListener('click', submitGuess);
restartButton.addEventListener('click', restartGame);

// Memulai game pertama kali
startGame();
