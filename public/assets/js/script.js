const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let isAgainstAI = true; // Enable AI mode

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Handle Player Move
function cellClick(e) {
    const index = e.target.dataset.index;

    if (gameBoard[index] !== "" || !gameActive || (isAgainstAI && currentPlayer === "O")) return;

    makeMove(index, currentPlayer);
    
    if (isAgainstAI && gameActive) {
        setTimeout(() => aiMove(), 500); // AI takes a turn after a short delay
    }
}

// Make Move Function
function makeMove(index, player) {
    gameBoard[index] = player;
    cells[index].textContent = player;
    checkWinner();
}

// AI Opponent Logic (Minimax for Smarter AI)
function aiMove() {
    let bestMove = minimax(gameBoard, "O").index;
    if (bestMove !== undefined) {
        makeMove(bestMove, "O");
    }
}

// Minimax Algorithm (AI Decision Making)
function minimax(board, player) {
    let availableSpots = board.map((v, i) => (v === "" ? i : null)).filter(v => v !== null);

    // Check for a winner or tie
    if (checkWin(board, "X")) return { score: -10 };
    if (checkWin(board, "O")) return { score: 10 };
    if (availableSpots.length === 0) return { score: 0 };

    let moves = [];
    
    for (let i of availableSpots) {
        let move = {};
        move.index = i;
        board[i] = player;

        if (player === "O") {
            let result = minimax(board, "X");
            move.score = result.score;
        } else {
            let result = minimax(board, "O");
            move.score = result.score;
        }

        board[i] = "";
        moves.push(move);
    }

    let bestMove;
    if (player === "O") {
        let bestScore = -Infinity;
        for (let move of moves) {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let move of moves) {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    }

    return bestMove;
}

// Check Winner Function
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

// Check Win (Used in Minimax)
function checkWin(board, player) {
    return winPatterns.some(pattern => pattern.every(index => board[index] === player));
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