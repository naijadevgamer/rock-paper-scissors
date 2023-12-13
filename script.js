"use strict";

const classicIcons = document.querySelectorAll(".phase--classic .icon");
const extendedIcons = document.querySelectorAll(".phase--extended .icon");
const housePickIcon = document.querySelector(".phase__pick--house .icon");
const phaseStatus = document.querySelector(".phase__status");
const headerScore = document.querySelector(".header__score");

// phases
const classicPhase = document.querySelector(".phase--classic");
const extendedPhase = document.querySelector(".phase--extended");
const comparismPhase = document.querySelector(".phase__comparism");

const rps = ["rock", "paper", "scissors"];
const rpsls = ["rock", "paper", "scissors", "lizard", "spock"];
let score = localStorage.getItem("score");
score ? (headerScore.textContent = score) : (score = 10);

// Classic icons functionality
for (let i = 0; i < classicIcons.length; i++) {
  classicIcons[i].addEventListener("click", (e) => {
    const present = e.currentTarget.classList.contains(`icon--${rps[i]}`);
    const randNum = Math.floor(Math.random() * 3);
    if (present) {
      // Hide the classic phase and show the next step
      classicPhase.classList.add("hidden");
      comparismPhase.classList.remove("hidden");

      // show what the player picked
      document
        .querySelector(".phase__pick--player .icon")
        .classList.add(`icon--${rps[i]}`);
      document.querySelector(
        ".phase__pick--player .icon__img"
      ).src = `images/icon-${rps[i]}.svg`;

      // show what the house picked
      setTimeout(() => {
        housePickIcon.classList.remove("hidden");
        housePickIcon.classList.add(`icon--${rps[randNum]}`);
        document.querySelector(
          ".phase__pick--house .icon__img"
        ).src = `images/icon-${rps[randNum]}.svg`;
        document.querySelector(
          ".phase__pick--house .icon__under"
        ).style.position = "absolute";

        // show the win or lose status
        phaseStatus.classList.remove("hidden");

        // Compare the two picks
        if (rps[i] === rps[randNum]) {
          displayStatusText("A tie");
        } else if (
          (rps[i] === rps[0] && rps[randNum] === rps[1]) ||
          (rps[i] === rps[1] && rps[randNum] === rps[2]) ||
          (rps[i] === rps[2] && rps[randNum] === rps[0])
        ) {
          displayStatusText("You lose");
          score--;
          displayWinner("house");
        } else {
          displayStatusText("You win");
          score++;
          displayWinner("player");
        }
      }, 1000);
    }
  });
}

// Play again
document.querySelector(".btn--again").addEventListener("click", () => {
  document.querySelectorAll(".phase__pick .icon__winner").forEach((e) => {
    e.classList.add("hidden");
  });
  classicPhase.classList.remove("hidden");
  comparismPhase.classList.add("hidden");
  housePickIcon.classList.add("hidden");
  for (let i = 0; i < rps.length; i++) {
    document.querySelectorAll(".phase__pick .icon").forEach((e) => {
      e.classList.remove(`icon--${rps[i]}`);
    });
  }
  phaseStatus.classList.add("hidden");
});

/// Show modal
//
document.querySelector(".btn--option").addEventListener("click", () => {
  document.querySelector(".option").classList.toggle("hidden");
});

document.querySelector(".level").addEventListener("click", () => {
  document.querySelector(".level__modal").classList.toggle("hidden");
});

document.querySelector(".option__item--rules").addEventListener("click", () => {
  document.querySelector(".modal-container").classList.remove("hidden");
});
document.querySelector(".modal__close").addEventListener("click", () => {
  document.querySelector(".modal-container").classList.add("hidden");
});
// document.querySelector(".modal-container").addEventListener("click", () => {
//   document.querySelector(".modal-container").classList.add("hidden");
// });

// Hide modal

// Display Win or lose status text
function displayStatusText(text) {
  document.querySelector(".phase__status-text").textContent = text;
}

// display winner
function displayWinner(winner) {
  document
    .querySelector(`.phase__pick--${winner} .icon__winner`)
    .classList.remove("hidden");
  localStorage.setItem("score", score);
  headerScore.textContent = score;
}
