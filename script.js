const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameInterval;

let snake = [{ x: 10, y: 10 }];
let snakeSize = 1;
let food = { x: 5, y: 5 };
let direction = 'right';
let gameRunning = false; 

function drawSnake() {
  ctx.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * 20, snake[i].y * 20, 20, 20);
  }
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameRunning) return; 

  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === 'right') head.x++;
  if (direction === 'left') head.x--;
  if (direction === 'up') head.y--;
  if (direction === 'down') head.y++;
  snake.unshift(head);

  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width / 20 ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height / 20 ||
    snake.slice(1).some((segment) => segment.x === snake[0].x && segment.y === snake[0].y)
  ) {
    gameRunning = false; 
    clearInterval(gameInterval); 
    alert('Game over!');

    
    document.getElementById('restartButton').style.display = 'block';
  }

  if (snake[0].x === food.x && snake[0].y === food.y) {
    snakeSize++;
    food = {
      x: Math.floor(Math.random() * (canvas.width / 20)),
      y: Math.floor(Math.random() * (canvas.height / 20)),
    };
  } else {
    snake.pop();
  }

  drawSnake();
  drawFood();
}

function handleInput(event) {
  if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
}

document.addEventListener('keydown', handleInput);

function startGame() {
  document.getElementById('startButton').style.display = 'none';
  canvas.style.display = 'block';

  // Inicia o jogo
  gameRunning = true;
  gameInterval = setInterval(update, 100);
}

function restartGame() {
  snake = [{ x: 10, y: 10 }];
  snakeSize = 1;
  food = { x: 5, y: 5 };
  direction = 'right';
  gameRunning = true;
  document.getElementById('restartButton').style.display = 'none';
  gameInterval = setInterval(update, 100); // Reinicia o intervalo de atualização do jogo
}
