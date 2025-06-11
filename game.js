// Sample coding terms data (embedded instead of external JSON)
const codingTerms = [
  {
    term: "array",
    categories: {
      isProgrammingLanguage: false,
      isDataType: true,
      isControlFlow: false,
      isAlgorithm: false,
      isDataStructure: true,
      isDevTool: false,
      isIDE: false,
    },
  },
  {
    term: "javascript",
    categories: {
      isProgrammingLanguage: true,
      isDataType: false,
      isControlFlow: false,
      isAlgorithm: false,
      isDataStructure: false,
      isDevTool: false,
      isIDE: false,
    },
  },
  {
    term: "if",
    categories: {
      isProgrammingLanguage: false,
      isDataType: false,
      isControlFlow: true,
      isAlgorithm: false,
      isDataStructure: false,
      isDevTool: false,
      isIDE: false,
    },
  },
  {
    term: "quicksort",
    categories: {
      isProgrammingLanguage: false,
      isDataType: false,
      isControlFlow: false,
      isAlgorithm: true,
      isDataStructure: false,
      isDevTool: false,
      isIDE: false,
    },
  },
  {
    term: "git",
    categories: {
      isProgrammingLanguage: false,
      isDataType: false,
      isControlFlow: false,
      isAlgorithm: false,
      isDataStructure: false,
      isDevTool: true,
      isIDE: false,
    },
  },
  {
    term: "vscode",
    categories: {
      isProgrammingLanguage: false,
      isDataType: false,
      isControlFlow: false,
      isAlgorithm: false,
      isDataStructure: false,
      isDevTool: false,
      isIDE: true,
    },
  },
  {
    term: "string",
    categories: {
      isProgrammingLanguage: false,
      isDataType: true,
      isControlFlow: false,
      isAlgorithm: false,
      isDataStructure: false,
      isDevTool: false,
      isIDE: false,
    },
  },
  {
    term: "python",
    categories: {
      isProgrammingLanguage: true,
      isDataType: false,
      isControlFlow: false,
      isAlgorithm: false,
      isDataStructure: false,
      isDevTool: false,
      isIDE: false,
    },
  },
  {
    term: "loop",
    categories: {
      isProgrammingLanguage: false,
      isDataType: false,
      isControlFlow: true,
      isAlgorithm: false,
      isDataStructure: false,
      isDevTool: false,
      isIDE: false,
    },
  },
  {
    term: "stack",
    categories: {
      isProgrammingLanguage: false,
      isDataType: false,
      isControlFlow: false,
      isAlgorithm: false,
      isDataStructure: true,
      isDevTool: false,
      isIDE: false,
    },
  },
  {
    term: "binary search",
    categories: {
      isProgrammingLanguage: false,
      isDataType: false,
      isControlFlow: false,
      isAlgorithm: true,
      isDataStructure: false,
      isDevTool: false,
      isIDE: false,
    },
  },
  {
    term: "docker",
    categories: {
      isProgrammingLanguage: false,
      isDataType: false,
      isControlFlow: false,
      isAlgorithm: false,
      isDataStructure: false,
      isDevTool: true,
      isIDE: false,
    },
  },
  {
    term: "intellij",
    categories: {
      isProgrammingLanguage: false,
      isDataType: false,
      isControlFlow: false,
      isAlgorithm: false,
      isDataStructure: false,
      isDevTool: false,
      isIDE: true,
    },
  },
  {
    term: "boolean",
    categories: {
      isProgrammingLanguage: false,
      isDataType: true,
      isControlFlow: false,
      isAlgorithm: false,
      isDataStructure: false,
      isDevTool: false,
      isIDE: false,
    },
  },
  {
    term: "java",
    categories: {
      isProgrammingLanguage: true,
      isDataType: false,
      isControlFlow: false,
      isAlgorithm: false,
      isDataStructure: false,
      isDevTool: false,
      isIDE: false,
    },
  },
]

// Game variables
let currentTermIndex = 0
let score = 0
let guesses = []
let remainingAttempts = 6

// UI Elements
const gameBoard = document.getElementById("game-board").getElementsByTagName("tbody")[0]
const scoreDisplay = document.getElementById("score")
const guessInput = document.getElementById("guess-input")
const submitButton = document.getElementById("submit-guess")
const restartButton = document.getElementById("restart-game")
const hintDisplay = document.getElementById("hint")
const attemptDisplay = document.getElementById("attempts")
const alertDisplay = document.getElementById("alert-message")
const showWordListButton = document.getElementById("show-word-list")
const wordListModal = document.getElementById("word-list-modal")
const closeWordListButton = document.getElementById("close-word-list")
const wordListItems = document.getElementById("word-list-items")

// Initialize game
function startGame() {
  guesses = []
  remainingAttempts = 6
  currentTermIndex = Math.floor(Math.random() * codingTerms.length)
  console.log("Selected term:", codingTerms[currentTermIndex])
  updateGameBoard()
  updateScore()
  updateAttempts()
  hintDisplay.textContent = ""
  alertDisplay.textContent = ""
  guessInput.focus()

  // Hide restart button during active game
  document.getElementById("restart-game").style.display = "none"
}

// Provide feedback based on categories
function provideCategoryFeedback(guessTerm, correctTerm) {
  const feedback = {
    isProgrammingLanguage: false,
    isDataType: false,
    isControlFlow: false,
    isAlgorithm: false,
    isDataStructure: false,
    isDevTool: false,
    isIDE: false,
  }

  Object.keys(guessTerm.categories).forEach((category) => {
    if (guessTerm.categories[category] === correctTerm.categories[category]) {
      feedback[category] = true
    } else {
      feedback[category] = false
    }
  })

  return feedback
}

// Process player's guess
function submitGuess() {
  const guess = guessInput.value.trim().toLowerCase()
  const correctTerm = codingTerms[currentTermIndex]

  if (!guess) {
    alertDisplay.textContent = "Please enter a coding term!"
    return
  }

  // Check if guess exists in terms
  const guessTerm = codingTerms.find((term) => term.term.toLowerCase() === guess)

  if (!guessTerm) {
    alertDisplay.textContent = `"${guess}" is not in our word list. Try another term!`
    return
  } else {
    alertDisplay.textContent = ""
  }

  // Check if already guessed
  if (guesses.some((g) => g.guess === guess)) {
    alertDisplay.textContent = `You already guessed "${guess}". Try a different term!`
    return
  }

  const feedback = provideCategoryFeedback(guessTerm, correctTerm)
  guesses.push({ guess: guess, feedback: feedback })
  remainingAttempts -= 1

  updateAttempts()
  updateGameBoard()

  // Check if won
  if (guess === correctTerm.term.toLowerCase()) {
    score += remainingAttempts + 1
    updateScore()
    showResultModal(true, correctTerm.term, remainingAttempts + 1)
    return
  }

  // Check if game over
  if (remainingAttempts <= 0) {
    showResultModal(false, correctTerm.term, 0)
    return
  }

  guessInput.value = ""
  guessInput.focus()
}

// Update game board with guesses
function updateGameBoard() {
  gameBoard.innerHTML = ""

  guesses.forEach((guessObj) => {
    const row = gameBoard.insertRow()
    const guessCell = row.insertCell(0)
    guessCell.textContent = guessObj.guess

    Object.keys(guessObj.feedback).forEach((category, index) => {
      const cell = row.insertCell(index + 1)
      if (guessObj.feedback[category]) {
        cell.textContent = "✓"
        cell.classList.add("true")
      } else {
        cell.textContent = "✗"
        cell.classList.add("false")
      }
    })
  })
}

// Update score display
function updateScore() {
  scoreDisplay.textContent = score
}

// Update attempts display
function updateAttempts() {
  attemptDisplay.textContent = remainingAttempts
}

// Restart game
function restartGame() {
  score = 0
  guesses = []
  startGame()
}

// Show word list modal
function showWordList() {
  wordListItems.innerHTML = ""
  codingTerms.forEach((term) => {
    const listItem = document.createElement("li")
    listItem.textContent = term.term
    wordListItems.appendChild(listItem)
  })
  wordListModal.style.display = "block"
}

// Close word list modal
function closeWordList() {
  wordListModal.style.display = "none"
}

// Show result modal
function showResultModal(isWin, correctTerm, pointsEarned) {
  const modal = document.getElementById("result-modal")
  const title = document.getElementById("result-title")
  const icon = document.getElementById("result-icon")
  const message = document.getElementById("result-message")
  const stats = document.getElementById("result-stats")
  const header = modal.querySelector(".result-header")
  const restartBtn = document.getElementById("restart-game")

  // Show restart button
  restartBtn.style.display = "inline-flex"

  if (isWin) {
    header.classList.remove("lose")
    title.textContent = "🎉 Congratulations!"
    icon.textContent = "🎉"
    message.textContent = `You guessed "${correctTerm}" correctly!`
    stats.innerHTML = `
      <div class="stat-row">
        <span class="label">Correct Answer:</span>
        <span class="value">${correctTerm}</span>
      </div>
      <div class="stat-row">
        <span class="label">Attempts Used:</span>
        <span class="value">${6 - remainingAttempts} / 6</span>
      </div>
      <div class="stat-row">
        <span class="label">Points Earned:</span>
        <span class="value">+${pointsEarned}</span>
      </div>
      <div class="stat-row">
        <span class="label">Total Score:</span>
        <span class="value">${score}</span>
      </div>
    `
  } else {
    header.classList.add("lose")
    title.textContent = "💀 Game Over"
    icon.textContent = "💀"
    message.textContent = `The correct term was "${correctTerm}"`
    stats.innerHTML = `
      <div class="stat-row">
        <span class="label">Correct Answer:</span>
        <span class="value">${correctTerm}</span>
      </div>
      <div class="stat-row">
        <span class="label">Attempts Used:</span>
        <span class="value">6 / 6</span>
      </div>
      <div class="stat-row">
        <span class="label">Current Score:</span>
        <span class="value">${score}</span>
      </div>
    `
  }

  modal.style.display = "block"
}

// Close result modal
function closeResultModal() {
  document.getElementById("result-modal").style.display = "none"
}

// Event listeners
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitGuess()
  }
})

submitButton.addEventListener("click", submitGuess)
restartButton.addEventListener("click", restartGame)
showWordListButton.addEventListener("click", showWordList)
closeWordListButton.addEventListener("click", closeWordList)

// Close modal when clicking outside
wordListModal.addEventListener("click", (event) => {
  if (event.target === wordListModal) {
    closeWordList()
  }
})

// Add these new event listeners
document.getElementById("play-again-btn").addEventListener("click", () => {
  closeResultModal()
  startGame()
})

document.getElementById("result-modal").addEventListener("click", (event) => {
  if (event.target === document.getElementById("result-modal")) {
    closeResultModal()
  }
})

// Start the game when page loads
document.addEventListener("DOMContentLoaded", startGame)
