// snake canvas
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

// food
let foodX;
let foodY;

let gameOver = false;
let gameStarted = false;
let gameRestarted = false;

// Event handler when the window is fully loaded
window.onload = function () {
    // Get the canvas and set its dimensions
    board = document.getElementById("snake-board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    // Initialize the game
    initializeGame();

    // Add event listener for keyup events
    document.addEventListener("keyup", handleKeyup);

    // Set up the game loop using setInterval
    setInterval(update, 1000 / 10); // 100 milliseconds
};

// Function to initialize the game state
function initializeGame() {
    // Reset snake and food positions, velocities, and other game variables
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    placeFood();
    gameOver = false;
    gameRestarted = false;

    // Display start message on the canvas
    context.fillStyle = "white";
    context.font = "20px Oxanium";
    context.textAlign = "center";
    context.fillText("Press any arrow key to start", board.width / 2, board.height / 2);

    // Redraw the initial state
    update();
}

// Event handler for keyup events
function handleKeyup(e) {
    // Check if the game is not started or if it's restarted
    if (!gameStarted || gameRestarted) {
        // Reset the game state
        initializeGame();
    }

    // If the game hasn't started yet, start it
    if (!gameStarted) {
        gameStarted = true;
        return;
    }

    // Process arrow key input during the game
    changeDirection(e);
}

// Function to update the game state and redraw the canvas
function update() {
    // Clear the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // If the game hasn't started, display the start message and return
    if (!gameStarted) {
        context.fillStyle = "white";
        context.font = "20px Oxanium";
        context.textAlign = "center";
        context.fillText("Press any arrow key to start", board.width / 2, board.height / 2);
        return;
    }

    // Draw the food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Check if the snake ate the food
    if (snakeX == foodX && snakeY == foodY) {
        // Add a new segment to the snake and place new food
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // Update the positions of the snake body segments
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    // Update the position of the snake's head
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Draw the snake
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Check game over conditions
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
        }
    }

    // If the game is over, display the game over message
    if (gameOver) {
        context.fillStyle = "white";
        context.font = "20px Oxanium";
        context.textAlign = "center";
        context.fillText("Game Over. Press any arrow key to play again", board.width / 2, board.height / 2);
        gameRestarted = true;
    }
}

// Function to handle arrow key input and change the snake's direction
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Function to place food at a random position on the canvas
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
