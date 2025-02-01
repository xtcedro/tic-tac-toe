const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Handle Cell Click
function cellClick(e) {
    const index = e.target.dataset.index;

    if (gameBoard[index] !== "" || !gameActive) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();
}

// Check for a Winner
function checkWinner() {
    for (const condition of winPatterns) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            statusText.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
            return;
        }
    }

    if (!gameBoard.includes("")) {
        gameActive = false;
        statusText.textContent = "It's a Tie! 🤝";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset Game
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => cell.textContent = "");
}

// Event Listeners
cells.forEach(cell => cell.addEventListener("click", cellClick));
resetButton.addEventListener("click", resetGame);