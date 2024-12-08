const colors = ["red", "green", "blue", "yellow"];
let gameSequence = [];
let userSequence = [];
let level = 0;

// DOM Elements
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("start");
const colorButtons = colors.map(color => document.getElementById(color));
const body = document.body;

// Sound effects
const sounds = {
  red: new Audio("./src/click.wav"),
  green: new Audio("./src/click.wav"),
  blue: new Audio("./src/click.wav"),
  yellow: new Audio("./src/click.wav"),
  wrong: new Audio("./src/game_over.wav")
};

// Start the game
startBtn.addEventListener("click", startGame);

function startGame() {
  level = 0;
  gameSequence = [];
  userSequence = [];
  statusEl.textContent = "Get Ready!";
  body.style.backgroundColor = ""; // Reset background color
  nextLevel();
}

// Move to the next level
function nextLevel() {
  userSequence = [];
  level++;
  statusEl.textContent = `Level ${level}`;
  const nextColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(nextColor);
  playSequence();
}

// Play the color sequence
function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    activateButton(gameSequence[i]);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
    }
  }, 800); 
}

// Highlight the button for a moment
function activateButton(color) {
  const button = document.getElementById(color);
  console.log(`Playing sound: ${color}`); 
  sounds[color]
    .play()
    .catch(err => console.error("Audio playback failed:", err)); 
  button.classList.add("active");
  setTimeout(() => button.classList.remove("active"), 400);
}

// Handle user clicks
colorButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const color = colors[index];
    userSequence.push(color);
    activateButton(color);
    checkUserInput();
  });
});

// Check the user's input against the game sequence
function checkUserInput() {
  const currentIndex = userSequence.length - 1;
  if (userSequence[currentIndex] !== gameSequence[currentIndex]) {
    gameOver();
    return;
  }

  // Check if the user completed the sequence
  if (userSequence.length === gameSequence.length) {
    setTimeout(nextLevel, 1000);
  }
}

// Handle game over
function gameOver() {
    statusEl.textContent = "Game Over! Press Start to Play Again.";
    gameSequence = [];
    userSequence = [];
    sounds.wrong.play().catch(err => console.error("Game over sound failed:", err));
  
    // Add the "game-over" class to the body
    body.classList.add("game-over");
  
    // Remove the class after 1 second to reset
    setTimeout(() => {
      body.classList.remove("game-over");
    }, 1000);
  }  