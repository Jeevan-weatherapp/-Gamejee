const basket = document.getElementById("basket");
const fallingObject = document.getElementById("falling-object");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");

let score = 0;
let basketPosition = 50; // Centered in percentage
let objectPositionY = 0;
let objectPositionX = Math.random() * 90; // Random X position
let fallingSpeed = 3;
let gameRunning = true;
let isBlackBall = false;

// Increase speed every 15 seconds
setInterval(() => {
    if (gameRunning) {
        fallingSpeed += 1;
    }
}, 15000);

// Move basket with buttons (for mobile & desktop)
leftBtn.addEventListener("click", () => {
    if (gameRunning && basketPosition > 5) {
        basketPosition -= 5;
        basket.style.left = basketPosition + "%";
    }
});

rightBtn.addEventListener("click", () => {
    if (gameRunning && basketPosition < 85) {
        basketPosition += 5;
        basket.style.left = basketPosition + "%";
    }
});

function dropObject() {
    if (!gameRunning) return;

    objectPositionY += fallingSpeed;
    fallingObject.style.top = objectPositionY + "px";
    fallingObject.style.left = objectPositionX + "%";

    // Check if object reaches the basket
    if (objectPositionY >= 460 && objectPositionX > basketPosition - 10 && objectPositionX < basketPosition + 10) {
        if (isBlackBall) {
            gameOver("Game Over! You caught a BLACK BALL ⚫!");
            return;
        } else {
            score++;
            scoreDisplay.textContent = score;
            resetObject();
        }
    }

    // Apple (🍎) falls to the bottom → Game Over
    if (objectPositionY > 500 && !isBlackBall) {
        gameOver("Game Over! You missed the apple.");
        return;
    }

    // Black ball (⚫) falls to the bottom → Continue game
    if (objectPositionY > 500 && isBlackBall) {
        resetObject(); // Black ball is ignored
    }

    requestAnimationFrame(dropObject);
}

function resetObject() {
    objectPositionY = 0;
    objectPositionX = Math.random() * 90; // Random X position
    
    // 20% chance of being a black ball
    isBlackBall = Math.random() < 0.2;
    fallingObject.style.backgroundColor = isBlackBall ? "black" : "red";
}

// End game and show restart button
function gameOver(message) {
    gameRunning = false;
    alert(message + " Your score: " + score);
    restartBtn.style.display = "block";
}

// Restart the game
function restartGame() {
    score = 0;
    scoreDisplay.textContent = score;
    basketPosition = 50;
    basket.style.left = basketPosition + "%";
    objectPositionY = 0;
    objectPositionX = Math.random() * 90;
    fallingSpeed = 3;
    gameRunning = true;
    restartBtn.style.display = "none";
    resetObject();
    dropObject();
}

// Start the game
resetObject();
dropObject();