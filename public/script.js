const car = document.getElementById('car');
const obstacle = document.getElementById('obstacle');
const scoreValue = document.getElementById('scoreValue');
const gameOver = document.getElementById('gameOver');
let score = 0;
let gameActive = true;

function moveCar(direction) {
  if (!gameActive) return;
  const carWidth = 30; // Car width
  const roadWidth = 320; // Road width
  const gameContainerWidth = gameContainer.offsetWidth;
  const margin = (gameContainerWidth - roadWidth) / 2;
  let leftPos = parseInt(window.getComputedStyle(car).getPropertyValue('left'));

  if (direction === 'left') {
    leftPos = Math.max(leftPos - 10, margin + carWidth / 2); // Ensure the car stays within the left boundary of the road
  } else if (direction === 'right') {
    leftPos = Math.min(
      leftPos + 10,
      gameContainerWidth - carWidth - margin + carWidth / 2
    ); // Ensure the car stays within the right boundary of the road
  }

  car.style.left = leftPos + 'px';
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    moveCar('left');
  } else if (event.key === 'ArrowRight') {
    moveCar('right');
  }
});

function updateScore() {
  score++;
  scoreValue.innerText = score;
}

function moveObstacle() {
  if (!gameActive) return;
  let topPos = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue('top')
  );
  topPos += 10;
  if (topPos > 600) {
    topPos = -50;
    let road = document.getElementById('road');
    let roadWidth = road.offsetWidth;
    let obstacleWidth = obstacle.offsetWidth;
    let maxLeft = roadWidth - obstacleWidth;
    let randomLeft = Math.floor(Math.random() * (maxLeft + 1));
    randomLeft = randomLeft < 50 ? 60 : randomLeft;
    obstacle.style.left = randomLeft + 'px';
    updateScore();
  }
  obstacle.style.top = topPos + 'px';

  if (checkCollision()) {
    endGame();
  }
}

function checkCollision() {
  const carRect = car.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  return !(
    carRect.bottom < obstacleRect.top ||
    carRect.top > obstacleRect.bottom ||
    carRect.right < obstacleRect.left ||
    carRect.left > obstacleRect.right
  );
}

function endGame() {
  gameActive = false;
  gameOver.style.display = 'block';
}

function restartGame() {
  gameActive = true;
  score = 0;
  scoreValue.innerText = score;
  car.style.left = '185px'; // Reset car position
  gameOver.style.display = 'none';
  obstacle.style.top = '-50px';
  moveObstacle(); // Start moving obstacle again
}

setInterval(moveObstacle, 50);
