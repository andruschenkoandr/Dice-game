const playerNameElement = document.getElementById("player-name");
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");

const playerDice = document.getElementById("player-dice");
const computerDice = document.getElementById("computer-dice");

const playerValueElement = document.getElementById("player-value");
const computerValueElement = document.getElementById("computer-value");

const generateButton = document.getElementById("generate-button");
const restartButton = document.getElementById("restart-button");
const gameMessage = document.getElementById("game-message");
const screenFlash = document.getElementById("screen-flash");
const gameContainer = document.querySelector(".game-container");

const MAX_WINS = 3;
const ANIMATION_DURATION = 650;
const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

let playerScore = 0;
let computerScore = 0;
let isGameOver = false;
let isRolling = false;

const enteredName = prompt("Введіть ваше ім'я:");
let playerName = "Гравець";
if (enteredName && enteredName.trim()) {
    playerName = enteredName.trim().slice(0, 10);
}
playerNameElement.textContent = playerName;

function generateNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateDice(dice, value) {
    dice.textContent = diceFaces[value - 1];
}

function updateScore() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

function triggerFlash() {
    if (!screenFlash) return;
    screenFlash.classList.add("active");
    setTimeout(() => {
        screenFlash.classList.remove("active");
    }, 400);
}

function showRoundEffect(isWin) {
    gameContainer.classList.remove("win-effect", "lose-effect");
    void gameContainer.offsetWidth;

    if (isWin) {
        gameContainer.classList.add("win-effect");
    } else {
        gameContainer.classList.add("lose-effect");
    }
}

function finishGame() {
    isGameOver = true;
    generateButton.disabled = true;

    if (playerScore === MAX_WINS) {
        gameMessage.textContent = `Вітаємо, ${playerName}! Ви перемогли!`;
    } else {
        gameMessage.textContent = "Комп'ютер переміг. Спробуйте ще раз!";
    }
}

function generateDice() {
    if (isGameOver || isRolling) {
        return;
    }

    isRolling = true;
    generateButton.disabled = true;
    gameMessage.textContent = "Кості підкидаються...";

    playerDice.classList.add("rolling");
    computerDice.classList.add("rolling");

    const playerNumber = generateNumber();
    const computerNumber = generateNumber();

    setTimeout(() => {
        updateDice(playerDice, playerNumber);
        updateDice(computerDice, computerNumber);

        if (playerNumber === 6 || computerNumber === 6) {
            triggerFlash();
        }

        playerValueElement.textContent = `Кидок: ${playerNumber}`;
        computerValueElement.textContent = `Кидок: ${computerNumber}`;

        playerDice.classList.remove("rolling");
        computerDice.classList.remove("rolling");

        if (playerNumber > computerNumber) {
            playerScore++;
            gameMessage.textContent = `${playerName} виграв цей раунд!`;
            showRoundEffect(true);
        } else if (computerNumber > playerNumber) {
            computerScore++;
            gameMessage.textContent = "Комп'ютер виграв цей раунд!";
            showRoundEffect(false);
        } else {
            gameMessage.textContent = "Нічия! Ніхто не отримує бал.";
        }

        updateScore();

        if (playerScore >= MAX_WINS || computerScore >= MAX_WINS) {
            finishGame();
        } else {
            generateButton.disabled = false;
        }

        isRolling = false;
    }, ANIMATION_DURATION);
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    isGameOver = false;
    isRolling = false;

    playerDice.classList.remove("rolling");
    computerDice.classList.remove("rolling");
    gameContainer.classList.remove("win-effect", "lose-effect");

    updateDice(playerDice, 1);
    updateDice(computerDice, 1);

    playerValueElement.textContent = "Кидок: 1";
    computerValueElement.textContent = "Кидок: 1";

    updateScore();
    gameMessage.textContent = "Натисни кнопку, щоб почати!";
    generateButton.disabled = false;
}

generateButton.addEventListener("click", generateDice);
restartButton.addEventListener("click", restartGame);