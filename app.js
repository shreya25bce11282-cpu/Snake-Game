//Get canvas and drawing context
const canvas=document.getElementById("gameCanvas")
const gameScore=document.getElementById("score")
const ctx= canvas.getContext("2d")

// Game settings
const gridSize = 20; // Size of each grid cell
const tileCount = canvas.width / gridSize; // Number of tiles per row/column

// Starting positions and properties
let snake=[{x:10,y:10},] // head of snake, it will be in the 10th row and 10th column of the grid
let food={}
let dx=0; //snake's horizontal direction
let dy=0; // snake's vertical direction
score=0;

//Generate random food position
function randomFood()
{
    food={
        x:Math.floor(Math.random()*tileCount),
        y:Math.floor(Math.random()*tileCount)
    };
}

//Draw everything on canvas
function drawGame()
{
    //Clear the canvas (paint it black)
    ctx.fillStyle='black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


//Draw the snake
ctx.fillStyle='green'; //color of snake
for (let segment of snake) { /*This loop lets you go through every element in the snake array, one at a time, and segment will be the value of each segment object (such as {x: 10, y: 10}).​
It's a clean, easy way to look at each part of the snake, starting from the head to the tail.*/
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2); //segment.x * gridSize and segment.y * gridSize calculate the top-left pixel position on the canvas for this segment, so the snake is drawn on a grid. 
    // ctx.fillRect(...) draws a filled square (a piece of the snake) at that position. gridSize - 2 makes the square a little smaller than the full cell, so there's a gap between segments
  }

  // Draw the food
ctx.fillStyle = 'red'; // Food color
ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// Move the snake
function moveSnake() 
{
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};


// Add new head
  snake.unshift(head) //unshift() inserts elements at the start of an array.
//In your snake game, it makes the snake’s head move!

// Check if snake ate food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    gameScore.textContent = 'Score: ' + score;
    randomFood(); // Generate new food
  } else {
    // Remove tail (if no food eaten, snake stays same length)
    snake.pop();
  }
}

  // Check if game is over
function checkGameOver() {
  const head = snake[0]; //take the first array of snake (the head) and store it in const head  
  // Check wall collision
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) 
    {
    return true;
  }
  return false;
}

//Handle keyboard input
function changeDirection(event) {
    //These numbers are the standard key codes for the arrow keys in JavaScript keyboard events.
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  
  const keyPressed = event.keyCode; //Gets the code of the key that was pressed, so you can check which arrow key the user hit.
  const goingUp = dy === -1;
  const goingDown = dy === 1;
  const goingRight = dx === 1;
  const goingLeft = dx === -1;

  // Prevent snake from going backwards into itself
  /*It checks which arrow key was pressed (left, up, right, or down).

It only lets the snake change direction if it isn't already moving in the opposite direction. For example, if the snake is moving right, you can't instantly go left (that would make the snake crash into itself).

When a valid arrow key is pressed, it updates dx and dy to set the new direction:

dx = -1, dy = 0 means move left

dx = 1, dy = 0 means move right

dx = 0, dy = -1 means move up

dx = 0, dy = 1 means move down*/
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -1;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -1;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 1;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 1;
  }
}

// Main game loop
function gameLoop() {
  if (checkGameOver()) {
    alert('Game Over! Your score: ' + score);
    // Reset game
    snake = [{x: 10, y: 10}];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = 'Score: 0';
    randomFood();
    return;
  }
  
  moveSnake();
  drawGame();
}

// Initialize game
randomFood();
document.addEventListener('keydown', changeDirection);

// Start the game loop (runs every 200ms = 5 times per second)
setInterval(gameLoop, 200)



