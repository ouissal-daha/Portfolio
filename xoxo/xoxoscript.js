let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const resultDisplay = document.getElementById('result');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const saveButton = document.getElementById('save');
const historyDisplay = document.getElementById('history');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCell, clickedCellIndex) {
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        resultDisplay.innerText = `اللاعب ${currentPlayer} فاز!`;
        gameActive = false;
        return;
    }
    if (!board.includes('')) {
        resultDisplay.innerText = 'التعادل!';
        gameActive = false;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    resultDisplay.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
    });
}

function saveResult() {
    if (resultDisplay.innerText) {
        const historyItem = document.createElement('div');
        historyItem.innerText = resultDisplay.innerText;
        historyDisplay.appendChild(historyItem);
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell, cell.dataset.index));
});

resetButton.addEventListener('click', resetGame);
saveButton.addEventListener('click', saveResult);

