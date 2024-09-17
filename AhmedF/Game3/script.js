const monkey = document.getElementById('monkey');
const scoreElement = document.getElementById('score');
const obstacles = document.querySelectorAll('.obstacle');

let score = 0;
let monkeyPositionX = 50;
let monkeyPositionY = 50;
let isJumping = false;
let isRunning = false;
const jumpHeight = 150;
const gravity = 4;
const obstacleSpeed = 5;

function startGame() {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    setInterval(updateGame, 20);
}

function handleKeydown(event) {
    if (event.code === 'Space') { // Jump on Space key
        jump();
    } else if (event.code === 'ArrowRight') { // Run on Right Arrow key
        isRunning = true;
    }
}

function handleKeyup(event) {
    if (event.code === 'ArrowRight') {
        isRunning = false;
    }
}

function jump() {
    if (isJumping) return;
    isJumping = true;
    let jumpPeak = 0;

    const jumpInterval = setInterval(() => {
        monkeyPositionY -= 4;
        jumpPeak += 4;
        monkey.style.bottom = monkeyPositionY + 'px';

        if (jumpPeak >= jumpHeight) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                monkeyPositionY += gravity;
                monkey.style.bottom = monkeyPositionY + 'px';

                if (monkeyPositionY >= 50) {
                    clearInterval(fallInterval);
                    monkeyPositionY = 50;
                    monkey.style.bottom = monkeyPositionY + 'px';
                    isJumping = false;
                }
            }, 20);
        }
    }, 20);
}

function updateGame() {
    if (isRunning) {
        monkeyPositionX += 5;
        monkey.style.left = monkeyPositionX + 'px';
    }

    obstacles.forEach(obstacle => {
        let obstacleY = parseInt(getComputedStyle(obstacle).top, 10);
        if (obstacleY > window.innerHeight) {
            obstacle.style.top = '-50px';
            obstacle.style.left = Math.random() * (window.innerWidth - 50) + 'px';
            if (obstacle.classList.contains('banana')) {
                score -= 10;
            } else {
                score += 20;
            }
            updateScore();
        } else {
            obstacle.style.top = obstacleY + obstacleSpeed + 'px';
            if (isCollision(obstacle)) {
                if (obstacle.classList.contains('banana')) {
                    score -= 10;
                } else {
                    score += 20;
                }
                obstacle.style.top = '-50px';
                obstacle.style.left = Math.random() * (window.innerWidth - 50) + 'px';
                updateScore();
            }
        }
    });
}

function isCollision(obstacle) {
    const obstacleRect = obstacle.getBoundingClientRect();
    const monkeyRect = monkey.getBoundingClientRect();
    return !(obstacleRect.right < monkeyRect.left || 
             obstacleRect.left > monkeyRect.right || 
             obstacleRect.bottom < monkeyRect.top || 
             obstacleRect.top > monkeyRect.bottom);
}

function updateScore() {
    scoreElement.textContent = 'Score: ' + score;
}

startGame();
