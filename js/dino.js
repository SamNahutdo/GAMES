const dino = document.getElementById('dino');
const game = document.getElementById('game');
const scoreEl = document.getElementById('score');
const gameOverText = document.querySelector('.game-over');
const startMessage = document.querySelector('.start-message');

let velocity = 0;
let gravity = 0.6;
let position = 0;
let isJumping = false;
let obstacles = [];
let speed = 5;
let score = 0;
let isGameOver = false;
let isGameStarted = false;
let cactusInterval;

const cactusImages = ['img11.jpg', 'img12.jpg', 'img13.jpg'];

function jump() {
    if (!isJumping) {
        dino.style.background = 'url("ako2.jpg") 0 0';
        dino.style.backgroundSize = '50px 50px';
        velocity = -12;
        isJumping = true;
    }
    }

function land() {
    dino.style.background = 'url("ako1.jpg") 0 0';
    dino.style.backgroundSize = '50px 50px';
    }

function createObstacle() {
const obstacle = document.createElement('div');
    obstacle.classList.add('cactus');
const randomImage = cactusImages[Math.floor(Math.random() * cactusImages.length)];
    obstacle.style.backgroundImage = `url('${randomImage}')`;
    obstacle.style.left = game.offsetWidth + 'px';
    game.appendChild(obstacle);
    obstacles.push(obstacle);
    }

function updateObstacles() {
    obstacles.forEach((obstacle, i) => {
        let left = parseInt(obstacle.style.left);
        if (left < -30) {
        obstacle.remove();
        obstacles.splice(i, 1);
        score += 10;
        } else {
        obstacle.style.left = (left - speed) + 'px';
        }

        if (checkCollision(obstacle)) {
        endGame();
        }
        });
        }

function checkCollision(obstacle) {
const dinoRect = dino.getBoundingClientRect();
const obsRect = obstacle.getBoundingClientRect();
    return (
        dinoRect.right > obsRect.left + 5 &&
        dinoRect.left < obsRect.right - 5 &&
        dinoRect.bottom > obsRect.top + 5
        );
        }

function endGame(win = false) {
    isGameOver = true;
    clearInterval(cactusInterval);
    dino.style.animation = 'none';
    gameOverText.textContent = win ? "Yey Thank you for saving me" : "You didn't save me :(";
    gameOverText.style.color = win ? "#28a745" : "#ff4444";
    gameOverText.style.display = 'block';
    }

function update() {
    if (isGameOver) return;

    velocity += gravity;
    position += velocity;

    if (position > 0) {
        position = 0;
        velocity = 0;
        isJumping = false;
        land();
    }

    dino.style.bottom = 100 - position + 'px';

    score += 1;
    scoreEl.textContent = score;

    speed = 5 + Math.floor(score / 500);

    updateObstacles();

    if (score >= 1500) {
        endGame(true);
        return;
    }

    requestAnimationFrame(update);
    }

function startGame() {
    if (!isGameStarted) {
        isGameStarted = true;
        startMessage.style.display = 'none';
        update();
        cactusInterval = setInterval(createObstacle, 2000);
    }
    }

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        if (isGameOver) location.reload();
        else {
        startGame();
        jump();
    }
    }
    });

document.addEventListener('touchstart', () => {
    if (isGameOver) location.reload();
    else {
        startGame();
        jump();
    }
    });



