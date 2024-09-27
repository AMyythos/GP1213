// Initialize variables for score, timer, and time left
let score = 0;
let timer;
let timeLeft = 10;

// Get references to HTML elements
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const gameButton = document.getElementById('gameButton');
const startButton = document.getElementById('startButton');

// Function to start the game
function startGame() {
    // Reset score and time left
    score = 0;
    timeLeft = 10;
    // Update the score and timer displays
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${timeLeft}`;
    // Disable the start button and enable the game button
    startButton.disabled = true;
    gameButton.disabled = false;

    // Start the timer with an interval of 1 second
    timer = setInterval(updateTimer, 1000);
}

// Function to update the timer and check if time is up
function updateTimer() {
    // Decrement time left
    //Comments
    //اهلا وسهلا 
    
    timeLeft--;
    // Update the timer display
    timerElement.textContent = `Time: ${timeLeft}`;

    // Check if time is up
    if (timeLeft <= 0) {
        // Stop the timer
        clearInterval(timer);
        // Disable the game button and enable the start button
        gameButton.disabled = true;
        startButton.disabled = false;
        // Show an alert with the final score
        alert(`Game Over! Your final score is ${score}`);
    }
}

// Add event listener to the game button for click events
gameButton.addEventListener('click', () => {
    // Increase the score by 1
    score++;
    // Update the score display
    scoreElement.textContent = `Score: ${score}`;
});

// Add event listener to the start button for click events
startButton.addEventListener('click', startGame);
