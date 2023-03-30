var blockSize = 25;
var total_row = 17; //total row number
var total_col = 17; //total column number
var board;
var context;
let score = 0;
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// Set the total number of rows and columns
var speedX = 0;  //pos of snake in x coordinate.
var speedY = 0;  //pos of snake in Y coordinate.
 
var snakeBody = [];
 
var foodX;
var foodY;
 
var gameOver = false;

var difficulty = 0;

let i = 1;

var audio = new Audio('audio/eatsound.mp3')

var audio2 = new Audio('audio/gameoversound.mp3')


// Set snake speed higher-value = slower speed, game difficulty
function easy(){
    difficulty = 1500/10;
    difficulty = parseInt(difficulty);
    console.log(difficulty)
    
}

function medium(){
    difficulty = 1000/10;
    difficulty = parseInt(difficulty);
    console.log(difficulty)
}

function hard(){
    difficulty = 700/10;
    difficulty = parseInt(difficulty);
    console.log(difficulty)
}


 
//changing color of snake

function color(){
    context.fillStyle =  document.getElementById("input").value;
}


window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");


    

    
    placeFood();
    document.addEventListener("keyup", changeDirection);  //for movements
    setTimeout(update, difficulty);
    
}

function update() {
    if (gameOver) {
        return;
    }

    // canvas color
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);
    
    
    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);
 
    if (snakeX == foodX && snakeY == foodY) {
        audio.play();
        snakeBody.push([foodX, foodY]);
        placeFood();
        updateScore(1);
    }
 
    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
        
    
        
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
    color();
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
 
    if (snakeX < 0
        || snakeX > total_col * blockSize
        || snakeY < 0
        || snakeY > total_row * blockSize) {
         
        // Out of bound condition
        gameOver = true;
        audio2.play();
        alert("Game Over");
        
    }
 
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
             
            // Snake eats own body
            gameOver = true;
            audio2.play();
            alert("Game Over");
            
        }
    }
    setTimeout(update, difficulty);
}
 
// how=  snake moves
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}
 
// places food randomly
function placeFood() {
 
    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize;
     
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

// score function place after snake eats food
function updateScore(points) {
    score += points;
    document.getElementById("scoreboard").textContent = "Score: " + score;
}

