const gameBoard = document.getElementById('game-board');
const earningsDisplay = document.getElementById('earnings');
const message = document.getElementById('message');

let earnings = 0;
let gameOver = false;

// Create 1,000 grapes
for (let i = 0; i < 1000; i++) {
    const grape = document.createElement('div');
    grape.classList.add('grape');
    grape.addEventListener('click', () => eatGrape(grape));
    gameBoard.appendChild(grape);
}

function eatGrape(grape) {
    if (gameOver) return;

    // Check if poisoned (1 in 1,000 chance)
    if (Math.random() < 0.001) {
        message.innerText = "You ate the poisoned grape! Game over.";
        gameOver = true;
        return;
    }

    // Increase earnings
    earnings += 50000;
    earningsDisplay.innerText = `Earnings: $${earnings.toLocaleString()}`;

    // Mark grape as eaten
    grape.classList.add('eaten');
    grape.removeEventListener('click', () => eatGrape(grape));
}
