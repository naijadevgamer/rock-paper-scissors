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

// Classic level functionality
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

// Extended level functionality
for (let i = 0; i < extendedIcons.length; i++) {
  extendedIcons[i].addEventListener("click", (e) => {
    const present = e.currentTarget.classList.contains(`icon--${rpsls[i]}`);
    const randNum = Math.floor(Math.random() * 5);
    if (present) {
      // Hide the extended phase and show the next step
      extendedPhase.classList.add("hidden");
      comparismPhase.classList.remove("hidden");

      // show what the player picked
      document
        .querySelector(".phase__pick--player .icon")
        .classList.add(`icon--${rpsls[i]}`);
      document.querySelector(
        ".phase__pick--player .icon__img"
      ).src = `images/icon-${rpsls[i]}.svg`;

      // show what the house picked
      setTimeout(() => {
        housePickIcon.classList.remove("hidden");
        housePickIcon.classList.add(`icon--${rpsls[randNum]}`);
        document.querySelector(
          ".phase__pick--house .icon__img"
        ).src = `images/icon-${rpsls[randNum]}.svg`;
        document.querySelector(
          ".phase__pick--house .icon__under"
        ).style.position = "absolute";

        // show the win or lose status
        phaseStatus.classList.remove("hidden");

        // Compare the two picks
        if (rpsls[i] === rpsls[randNum]) {
          displayStatusText("It's a tie");
        } else if (
          (rpsls[i] === rpsls[0] && rpsls[randNum] === rpsls[1]) ||
          (rpsls[i] === rpsls[0] && rpsls[randNum] === rpsls[4]) ||
          (rpsls[i] === rpsls[1] && rpsls[randNum] === rpsls[2]) ||
          (rpsls[i] === rpsls[1] && rpsls[randNum] === rpsls[3]) ||
          (rpsls[i] === rpsls[2] && rpsls[randNum] === rpsls[4]) ||
          (rpsls[i] === rpsls[2] && rpsls[randNum] === rpsls[0]) ||
          (rpsls[i] === rpsls[3] && rpsls[randNum] === rpsls[0]) ||
          (rpsls[i] === rpsls[3] && rpsls[randNum] === rpsls[2]) ||
          (rpsls[i] === rpsls[4] && rpsls[randNum] === rpsls[3]) ||
          (rpsls[i] === rpsls[4] && rpsls[randNum] === rpsls[1])
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
  const present = document
    .querySelector(".modal__level--classic")
    .classList.contains("modal__level--active");
  present
    ? classicPhase.classList.remove("hidden")
    : extendedPhase.classList.remove("hidden");

  comparismPhase.classList.add("hidden");
  housePickIcon.classList.add("hidden");
  for (let i = 0; i < rps.length; i++) {
    document.querySelectorAll(".phase__pick .icon").forEach((e) => {
      e.classList.remove(`icon--${rps[i]}`);
    });
  }
  for (let i = 0; i < rpsls.length; i++) {
    document.querySelectorAll(".phase__pick .icon").forEach((e) => {
      e.classList.remove(`icon--${rpsls[i]}`);
    });
  }
  phaseStatus.classList.add("hidden");
});

/// Show modal functionalities
document.querySelector(".btn--option").addEventListener("click", () => {
  document.querySelector(".option").classList.toggle("hidden");
});

document
  .querySelector(".option__item--levels")
  .addEventListener("click", () => {
    document.querySelector(".modal-container").classList.remove("hidden");
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".modal__level-box").classList.remove("hidden");
    document.querySelector(".option").classList.toggle("hidden");
  });

document.querySelector(".option__item--rules").addEventListener("click", () => {
  document.querySelector(".modal-container").classList.remove("hidden");
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".modal__level-box").classList.add("hidden");
  document.querySelector(".option").classList.toggle("hidden");
});
document.querySelector(".modal__close").addEventListener("click", () => {
  document.querySelector(".modal-container").classList.add("hidden");
});
document.querySelector(".modal-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-container"))
    document.querySelector(".modal-container").classList.add("hidden");
});

// Extendend level pointer
document
  .querySelector(".modal__level--extended")
  .addEventListener("click", () => {
    document
      .querySelector(".modal__level--extended")
      .classList.add("modal__level--active");
    document
      .querySelector(".modal__level--classic")
      .classList.remove("modal__level--active");
    document
      .querySelector(".header__logo--extended")
      .classList.remove("hidden");
    document.querySelector(".header__logo--classic").classList.add("hidden");
    document
      .querySelector(".modal__rules--extended")
      .classList.remove("hidden");
    document.querySelector(".modal__rules--classic").classList.add("hidden");

    extendedPhase.classList.remove("hidden");
    classicPhase.classList.add("hidden");
    comparismPhase.classList.add("hidden");
  });

// classic level pointer
document
  .querySelector(".modal__level--classic")
  .addEventListener("click", () => {
    document
      .querySelector(".modal__level--classic")
      .classList.add("modal__level--active");
    document
      .querySelector(".modal__level--extended")
      .classList.remove("modal__level--active");

    document.querySelector(".header__logo--classic").classList.remove("hidden");
    document.querySelector(".header__logo--extended").classList.add("hidden");
    document.querySelector(".modal__rules--classic").classList.remove("hidden");
    document.querySelector(".modal__rules--extended").classList.add("hidden");

    extendedPhase.classList.add("hidden");
    classicPhase.classList.remove("hidden");
    comparismPhase.classList.add("hidden");
  });

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
