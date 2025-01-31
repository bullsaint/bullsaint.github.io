const gameBoard = document.getElementById('game-board');
const earningsDisplay = document.getElementById('earnings');
const message = document.getElementById('message');

let earnings = 0;
let gameOver = false;
document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
});
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

const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

function updateLeaderboard() {
    const list = document.getElementById('leaderboard');
    list.innerHTML = '';
    leaderboard
        .sort((a, b) => b.score - a.score)
        .slice(0, 5) // Show only the top 5
        .forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `${entry.name}: $${entry.score.toLocaleString()}`;
            list.appendChild(li);
        });
}

function saveScore() {
    const name = prompt("Enter your name for the leaderboard:");
    if (!name) return;
    
    leaderboard.push({ name, score: earnings });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    updateLeaderboard();
}

// Call saveScore() when game ends
function eatGrape(grape) {
    if (gameOver) return;

    if (Math.random() < 0.001) {
        message.innerText = "You ate the poisoned grape! Game over.";
        saveScore();
        gameOver = true;
        return;
    }

    earnings += 50000;
    earningsDisplay.innerText = `Earnings: $${earnings.toLocaleString()}`;
    grape.classList.add('eaten');
    grape.removeEventListener('click', () => eatGrape(grape));
}

updateLeaderboard();
