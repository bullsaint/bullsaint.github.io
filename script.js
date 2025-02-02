let gameOver = false;
let earnings = 0;
let deadlyGrape;
let timeLeft = 60; // Default time limit for Hard mode
let difficulty = 'easy';
const earningsDisplay = document.getElementById('earnings');
const timerDisplay = document.getElementById('timer');
const timeLeftDisplay = document.getElementById('time-left');
const message = document.getElementById('message');
const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');
const biteSound = document.getElementById('bite-sound');
const poisonSound = document.getElementById('poison-sound');
const goldenSound = document.getElementById('golden-sound');
const rottenSound = document.getElementById('rotten-sound');

function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    document.getElementById('difficulty-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    restartButton.style.display = 'none';
    
    earnings = 0;
    gameOver = false;
    earningsDisplay.innerText = "Earnings: $0";
    
    generateGrapes();
    
    if (difficulty === 'hard') {
        timerDisplay.style.display = 'block';
        timeLeft = 60;
        timeLeftDisplay.innerText = timeLeft;
        startTimer();
    }
}

function generateGrapes() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 1000; i++) {
        let grape = document.createElement('div');
        grape.classList.add('grape');
        grape.addEventListener('click', () => eatGrape(grape));
        gameBoard.appendChild(grape);
    }
    
    placeDeadlyGrape();
}

function placeDeadlyGrape() {
    const grapes = document.querySelectorAll('.grape');
    deadlyGrape = grapes[Math.floor(Math.random() * grapes.length)];
    deadlyGrape.classList.add('deadly');
}

function moveDeadlyGrape() {
    if (!gameOver) {
        deadlyGrape.classList.remove('deadly');
        placeDeadlyGrape();
    }
}

// Generate Grapes
for (let i = 0; i < 1000; i++) {
    const grape = document.createElement('div');
    grape.classList.add('grape');
    grape.addEventListener('click', () => eatGrape(grape));
    gameBoard.appendChild(grape);
}

// Function to Eat Grapes
function eatGrape(grape) {
    if (gameOver) return;

    const chance = Math.random();

    if (chance < 0.001) {  // Poisoned grape
        message.innerText = "You ate the poisoned grape! Game over.";
        poisonSound.play();
        gameOver = true;
        return;
    } else if (chance < 0.005) {  // Golden grape
        message.innerText = "You found a Golden Grape! +$250,000!";
        earnings += 250000;
        goldenSound.play();
        grape.classList.add('golden');
    } else if (chance < 0.010) {  // Rotten grape
        message.innerText = "Oh no! Rotten Grape! -$100,000!";
        earnings -= 100000;
        rottenSound.play();
        grape.classList.add('rotten');
    } else {  // Normal grape
        earnings += 50000;
        biteSound.play();
    }

    earningsDisplay.innerText = `Earnings: $${earnings.toLocaleString()}`;
    grape.classList.add('eaten');
    grape.removeEventListener('click', () => eatGrape(grape));
}

function startTimer() {
    const timer = setInterval(() => {
        if (gameOver) {
            clearInterval(timer);
            return;
        }
        
        timeLeft--;
        timeLeftDisplay.innerText = timeLeft;
        
        if (timeLeft <= 0) {
            earningsDisplay.innerText = "Time's up! Game over.";
            gameOver = true;
            restartButton.style.display = 'block';
            clearInterval(timer);
        }
    }, 1000);
}

function restartGame() {
    document.getElementById('difficulty-screen').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
}
