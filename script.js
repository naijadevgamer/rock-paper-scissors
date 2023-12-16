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
          housePickIcon.querySelector(".icon__under").style.position =
            "absolute";
          phaseStatus.classList.remove("hidden");

          if (choices[i] === choices[randNum]) {
            displayStatusText("It's a tie");
          } else {
            const winConditions = [
              [0, 1],
              [0, 3],
              [1, 2],
              [1, 4],
              [2, 3],
              [2, 0],
              [3, 0],
              [3, 2],
              [4, 3],
              [4, 1],
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
          displayStatusText("It's a tie");
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

// Play again functionality
document.querySelector(".btn--again").addEventListener("click", playAgain);

/// Show modal functionalities
// toggle option button
document.querySelector(".btn--option").addEventListener("click", () => {
  document.querySelector(".option").classList.toggle("hidden");
});

// show levels
document
  .querySelector(".option__item--levels")
  .addEventListener("click", () => {
    document.querySelector(".modal-container").classList.remove("hidden");
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".modal__level-box").classList.remove("hidden");
    document.querySelector(".option").classList.toggle("hidden");
  });

// show rules modal
document.querySelector(".option__item--rules").addEventListener("click", () => {
  document.querySelector(".modal-container").classList.remove("hidden");
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".modal__level-box").classList.add("hidden");
  document.querySelector(".option").classList.toggle("hidden");
});

// close rules modal
document.querySelector(".modal__close").addEventListener("click", () => {
  document.querySelector(".modal-container").classList.add("hidden");
});
document.querySelector(".modal-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-container"))
    document.querySelector(".modal-container").classList.add("hidden");
});

// Extendend level switch
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
    document.querySelector(".modal-container").classList.add("hidden");
    playAgain();
    classicPhase.classList.add("hidden");
  });

// classic level switch
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
    document.querySelector(".modal-container").classList.add("hidden");
    playAgain();
    extendedPhase.classList.add("hidden");
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

// play again
// function playAgain() {
//   // Hide the winner display
//   document.querySelectorAll(".phase__pick .icon__winner").forEach((e) => {
//     e.classList.add("hidden");
//   });
//   // check if active then show the active phase
//   const present = document
//     .querySelector(".modal__level--classic")
//     .classList.contains("modal__level--active");
//   present
//     ? classicPhase.classList.remove("hidden")
//     : extendedPhase.classList.remove("hidden");

//   // Hide house icon an other phases
//   comparismPhase.classList.add("hidden");
//   housePickIcon.classList.add("hidden");
//   phaseStatus.classList.add("hidden");

//   // remove all classes of icons from the player and house pick
//   for (let i = 0; i < rps.length; i++) {
//     document.querySelectorAll(".phase__pick .icon").forEach((e) => {
//       e.classList.remove(`icon--${rps[i]}`);
//     });
//   }
// }
