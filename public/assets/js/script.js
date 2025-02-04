// Game Variables
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const restartBtn = document.querySelector(".restart-btn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let singlePlayer = true; // AI mode enabled

// Winning Patterns
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Handle Cell Click (Player Move)
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        if (board[index] === "" && gameActive && currentPlayer === "X") {
            board[index] = currentPlayer;
            animateMove(cell, currentPlayer);
            checkWinner();
            currentPlayer = "O"; // Switch to AI
            if (gameActive && singlePlayer) {
                statusText.textContent = "🤖 AI Thinking...";
                setTimeout(aiMove, 800); // Delay AI move for realism
            }
        }
    });
});

// AI Move (With Animation)
function aiMove() {
    let bestMove = findBestMove();
    if (bestMove !== -1) {
        board[bestMove] = "O";
        animateMove(cells[bestMove], "O");
        checkWinner();
        currentPlayer = "X"; // Switch back to player
        if (gameActive) statusText.textContent = "Player X's Turn";
    }
}

// Animate Move (Fades in AI's choice)
function animateMove(cell, player) {
    cell.textContent = "";
    cell.style.opacity = "0";
    setTimeout(() => {
        cell.textContent = player;
        cell.style.transition = "opacity 0.5s ease-in-out";
        cell.style.opacity = "1";
    }, 200);
}

// AI Strategy (Basic Minimax)
function findBestMove() {
    // 1. Check if AI can win
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "O";
            if (checkWin("O")) return i;
            board[i] = "";
        }
    }

    // 2. Block Player X from winning
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "X";
            if (checkWin("X")) return i;
            board[i] = "";
        }
    }

    // 3. Take center if available
    if (board[4] === "") return 4;

    // 4. Take a random available corner
    const corners = [0, 2, 6, 8].filter(i => board[i] === "");
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

    // 5. Take any remaining spot
    return board.findIndex(cell => cell === "");
}

// Check for Winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.textContent = `🎉 Player ${board[a]} Wins!`;
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        statusText.textContent = "It's a Draw! 🤝";
    }
}

// Helper function to check potential wins
function checkWin(player) {
    return winPatterns.some(([a, b, c]) => board[a] === player && board[b] === player && board[c] === player);
}

// Restart Game
restartBtn.addEventListener("click", () => {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.opacity = "1";
    });
});