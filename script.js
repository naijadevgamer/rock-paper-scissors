"use strict";

// Query Selectors
const getElement = (selector) => document.querySelector(selector);
const getAllElements = (selector) => document.querySelectorAll(selector);

// Phases
const classicPhase = getElement(".phase--classic");
const extendedPhase = getElement(".phase--extended");
const comparismPhase = getElement(".phase__comparism");

// Others
const classicIcons = getAllElements(".phase--classic .icon");
const extendedIcons = getAllElements(".phase--extended .icon");
const playerPickIcon = getElement(".phase__pick--player .icon");
const housePickIcon = getElement(".phase__pick--house .icon");
const phaseStatus = getElement(".phase__status");
const headerScore = getElement(".header__score");

// Game Options
const rps = ["rock", "paper", "scissors"];
const rpsls = ["rock", "paper", "scissors", "lizard", "spock"];
let score = localStorage.getItem("score") || 10;
headerScore.textContent = score;

// Function to get a random number
const getRandomNumber = (max) => Math.floor(Math.random() * max);

// Function to display status text
const displayStatusText = (text) => {
  getElement(".phase__status-text").textContent = text;
};

// Function to display winner
const displayWinner = (winner) => {
  const winnerElement = getElement(`.phase__pick--${winner} .icon__winner`);
  winnerElement.classList.remove("hidden");
  localStorage.setItem("score", score);
  headerScore.textContent = score;
};

// Function to play again
const playAgain = () => {
  // Hide the winner display
  getAllElements(".phase__pick .icon__winner").forEach((e) =>
    e.classList.add("hidden")
  );

  // Check if active then show the active phase
  const activePhase = document
    .querySelector(".modal__level--classic")
    .classList.contains("modal__level--active")
    ? classicPhase
    : extendedPhase;
  activePhase.classList.remove("hidden");

  comparismPhase.classList.add("hidden");
  housePickIcon.classList.add("hidden");
  phaseStatus.classList.add("hidden");

  // Remove all icons modifier from the player and house icons
  const picks = activePhase === classicPhase ? rps : rpsls;
  picks.forEach((pick) => {
    getAllElements(".phase__pick .icon").forEach((e) =>
      e.classList.remove(`icon--${pick}`)
    );
  });
};

// Function to handle player pick
const handlePlayerPick = (icons, choices) => {
  for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("click", (e) => {
      const present = e.currentTarget.classList.contains(`icon--${choices[i]}`);
      const randNum = getRandomNumber(choices.length);
      if (present) {
        const currentPhase = choices === rps ? classicPhase : extendedPhase;
        // Hide the current phase and show the next step
        currentPhase.classList.add("hidden");
        comparismPhase.classList.remove("hidden");

        // Show what the player picked
        playerPickIcon.classList.add(`icon--${choices[i]}`);
        playerPickIcon.querySelector(
          ".icon__img"
        ).src = `images/icon-${choices[i]}.svg`;

        // Show what the house picked
        setTimeout(() => {
          housePickIcon.classList.remove("hidden");
          housePickIcon.classList.add(`icon--${choices[randNum]}`);
          housePickIcon.querySelector(
            ".icon__img"
          ).src = `images/icon-${choices[randNum]}.svg`;
          getElement(".phase__pick--house .icon__under").style.position =
            "absolute";
          phaseStatus.classList.remove("hidden");

          // Compare the two picks
          if (choices[i] === choices[randNum]) {
            displayStatusText("It's a tie");
          } else {
            const winConditions = [
              [0, 2],
              [0, 3],
              [1, 0],
              [1, 4],
              [2, 1],
              [2, 3],
              [3, 1],
              [3, 4],
              [4, 3],
              [4, 0],
            ];
            const isWin = winConditions.some(
              ([a, b]) =>
                choices[i] === choices[a] && choices[randNum] === choices[b]
            );
            if (isWin) {
              displayStatusText("You win");
              score++;
              displayWinner("player");
            } else {
              displayStatusText("You lose");
              score--;
              displayWinner("house");
            }
          }
        }, 1000);
      }
    });
  }
};

// Function to toggle option button
const toggleOptions = () => {
  getElement(".option").classList.toggle("hidden");
};

// Function to toggle modal container
const toggleModalBox = () => {
  getElement(".modal-container").classList.toggle("hidden");
};

// Function to show modal
const showModal = (modal) => {
  getElement(`.option__item--${modal}`).addEventListener("click", () => {
    if (modal === "rules") {
      getElement(".modal").classList.remove("hidden");
      getElement(".modal__level-box").classList.add("hidden");
    } else {
      getElement(".modal").classList.add("hidden");
      getElement(".modal__level-box").classList.remove("hidden");
    }
    toggleOptions();
    toggleModalBox();
  });
};

// Function to switch level
const switchLevel = (level) => {
  getElement(`.modal__level--${level}`).addEventListener("click", () => {
    const levels =
      level === "classic" ? ["classic", "extended"] : ["extended", "classic"];
    getElement(`.modal__level--${levels[0]}`).classList.add(
      "modal__level--active"
    );
    getElement(`.modal__level--${levels[1]}`).classList.remove(
      "modal__level--active"
    );

    getElement(`.header__logo--${levels[0]}`).classList.remove("hidden");
    getElement(`.header__logo--${levels[1]}`).classList.add("hidden");
    getElement(`.modal__rules--${levels[0]}`).classList.remove("hidden");
    getElement(`.modal__rules--${levels[1]}`).classList.add("hidden");
    toggleModalBox();
    playAgain();
  });
};

// Event Listeners
handlePlayerPick(classicIcons, rps);
handlePlayerPick(extendedIcons, rpsls);
showModal("rules");
showModal("levels");
switchLevel("classic");
switchLevel("extended");

getElement(".btn--again").addEventListener("click", playAgain);
getElement(".btn--option").addEventListener("click", toggleOptions);
getElement(".modal__close").addEventListener("click", toggleModalBox);
getElement(".modal-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-container")) toggleModalBox();
});
