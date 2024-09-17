const mario = document.getElementById('mario');
const ground = document.getElementById('ground');
let isJumping = false;
let isRunning = false;
let marioPositionX = 50;
let marioPositionY = 50;

function moveMario() {
    if (isRunning) {
        marioPositionX += 5; // Move Mario to the right
        mario.style.left = marioPositionX + 'px';
    }
}

function jump() {
    if (isJumping) return;
    isJumping = true;
    let jumpHeight = 0;
    const maxJumpHeight = 150;
    const jumpSpeed = 4;
    
    const jumpInterval = setInterval(() => {
        marioPositionY -= jumpSpeed;
        jumpHeight += jumpSpeed;
        mario.style.bottom = marioPositionY + 'px';
        if (jumpHeight >= maxJumpHeight) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                marioPositionY += jumpSpeed;
                mario.style.bottom = marioPositionY + 'px';
                if (marioPositionY >= 50) {
                    clearInterval(fallInterval);
                    marioPositionY = 50;
                    mario.style.bottom = marioPositionY + 'px';
                    isJumping = false;
                }
            }, 20);
        }
    }, 20);
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

document.addEventListener('keydown', handleKeydown);
document.addEventListener('keyup', handleKeyup);

setInterval(moveMario, 20); // Update Mario’s position every 20ms
