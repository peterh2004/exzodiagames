//pong board
let board;
let boardWidth = 1000;
let boardHeight = 500;
let context; 

//initial player variables 
let playerWidth = 10;
let playerHeight = 75;
let playerVelocityY = 0;


//player 1 and player 2 objects
let player1 = {
    x : 10,
    y : 212.5,
    width: playerWidth,
    height: playerHeight,
    velocityY : playerVelocityY
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y : 212.5,
    width: playerWidth,
    height: playerHeight,
    velocityY : playerVelocityY
}

//ball object
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX : 1.5,
    velocityY : 2
}

let player1Score = 0;
let player2Score = 0;


/* Initial function run when html is loaded, 
1. sets the canvas's dimensions, context, 
2. establishes eventListener for keydown and keyup (for player paddle y-movement) 
3. calls requestAnimationFrame method to start the game animation loop. */
window.onload = function() {
    board = document.getElementById("pong-board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); 
   
    document.addEventListener("keydown", function(key) {
        if (key.code == "KeyW") {
            player1.velocityY = -3;
        }
        else if (key.code == "KeyS") {
            player1.velocityY = 3;
        }
    
        if (key.code == "ArrowUp") {
            player2.velocityY = -3;
        }
        else if (key.code == "ArrowDown") {
            player2.velocityY = 3;
        }
    });
    document.addEventListener("keyup", function(key){
        if (key.code == "KeyW") {
            player1.velocityY = 0;
        }
        else if (key.code == "KeyS") {
            player1.velocityY = 0;
        }

        if (key.code == "ArrowUp") {
            player2.velocityY = 0;
        }
        else if (key.code == "ArrowDown") {
            player2.velocityY = 0;
        }
    });
   
    requestAnimationFrame(animate);
}

//function that contains game animation/update logic
function animate() {
    requestAnimationFrame(animate);
    //clears canvas in preparation for next frame
    context.clearRect(0, 0, board.width, board.height);

    //player1, sets location of padle for next frame and checks if the location is out of bounds before rendering
    context.fillStyle = "red";
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    context.fillStyle = "blue";
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, playerWidth, playerHeight);

    //ball, sets next frame location and reverses y direction if it collides with the top or bottom border
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ballWidth, ballHeight);

    if (ball.y <= 0 || (ball.y + ballHeight >= boardHeight)) { 
        ball.velocityY *= -1; 
    }

    //detects collision and bounces ball off paddles by flipping x direction
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) { 
            ball.velocityX *= -1;  
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) { 
            ball.velocityX *= -1;  
        }
    }

    //if ball collides with right or left walls, game over and resets
    if (ball.x < 0) {
        player2Score++;
        resetGame(1.5);
    }
    else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        resetGame(-1.5);
    }

    //scoreboard 
    context.font = "45px Oxanium";
    context.fillText(player1Score, boardWidth/5, 45);
    context.fillText(player2Score, boardWidth*4/5 - 45, 45);

    //creates dotted line down middle of board
    for (let i = 10; i < board.height; i += 25) { 
        context.fillRect(board.width / 2 - 10, i, 5, 5); 
    }
}

//returns true if out of bounds in terms of y height
function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

//returns true if the two passed objects collide or intersect
function detectCollision(a, b) {
    return a.x < b.x + b.width &&  a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;    
}

//resets ball object
function resetGame(direction) {
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX : direction,
        velocityY : 2
    }
}