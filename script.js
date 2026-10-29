
const tossBtn = document.getElementById("tossBtn");
const tossResult = document.getElementById("tossResult");
const tossSection = document.getElementById("tossSection");
const gameSection = document.getElementById("gameSection");
const turnText = document.getElementById("turnText");
const score1Element = document.getElementById("score1");
const score2Element = document.getElementById("score2");
const rollResult = document.getElementById("rollResult");
const playBtn = document.getElementById("playBtn");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = 1;
let score1 = 0;
let score2 = 0;
let gameOver = false;

tossBtn.addEventListener("click", function () {
  // Randomly select Player 1 or Player 2
  currentPlayer = Math.random() < 0.5 ? 1 : 2;

  tossResult.textContent =
    `Player ${currentPlayer} wins the toss and starts first!`;

  tossBtn.disabled = true;

  // Show the game after the toss
  setTimeout(function () {
    tossSection.hidden = true;
    gameSection.hidden = false;
    updateTurn();
  }, 1000);
});

function updateTurn() {
  turnText.textContent = `Player ${currentPlayer}'s Turn`;
}

playBtn.addEventListener("click", function () {
  if (gameOver) return;

  // Generate a random number from 1 to 6
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  rollResult.textContent =
    `Player ${currentPlayer} got ${randomNumber}!`;

  // Add the number to the current player's score
  if (currentPlayer === 1) {
    score1 += randomNumber;
    score1Element.textContent = score1;
  } else {
    score2 += randomNumber;
    score2Element.textContent = score2;
  }

  // First player to reach 20 points wins
  if (score1 >= 20 || score2 >= 20) {
    gameOver = true;
    message.textContent = `🎉 Player ${currentPlayer} wins the game!`;
    turnText.textContent = "Game Over!";
    playBtn.disabled = true;
    return;
  }

  // Switch turns
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurn();
});

restartBtn.addEventListener("click", function () {
  score1 = 0;
  score2 = 0;
  currentPlayer = 1;
  gameOver = false;

  score1Element.textContent = 0;
  score2Element.textContent = 0;
  tossResult.textContent = "Ready for the toss?";
  rollResult.textContent = "Click the button to get a random number.";
  message.textContent = "";

  tossBtn.disabled = false;
  playBtn.disabled = false;

  gameSection.hidden = true;
  tossSection.hidden = false;
});
