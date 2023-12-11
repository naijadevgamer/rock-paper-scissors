"use strict";
const classic = document.querySelectorAll(".phase--classic .icon");

const rps = ["rock", "paper", "scissors"];
let score = 10;

for (let i = 0; i < classic.length; i++) {
  classic[i].addEventListener("click", (e) => {
    const present = e.currentTarget.classList.contains(`icon--${rps[i]}`);
    const randNum = Math.floor(Math.random() * 3);
    console.log(randNum);
    if (present) {
      // Hide the choosing phase and show the next step
      document.querySelector(".phase--classic").classList.add("hidden");
      document.querySelector(".phase__comparism").classList.remove("hidden");

      // show what the player picked
      document
        .querySelector(".phase__pick--player .icon")
        .classList.add(`icon--${rps[i]}`);
      document.querySelector(
        ".phase__pick--player .icon__img"
      ).src = `images/icon-${rps[i]}.svg`;

      // show what the house picked
      setTimeout(() => {
        document
          .querySelector(".phase__pick--house .icon")
          .classList.remove("hidden");
        document
          .querySelector(".phase__pick--house .icon")
          .classList.add(`icon--${rps[randNum]}`);
        document.querySelector(
          ".phase__pick--house .icon__img"
        ).src = `images/icon-${rps[randNum]}.svg`;
        document.querySelector(
          ".phase__pick--house .icon__under"
        ).style.position = "absolute";

        // show the win or lose status
        document.querySelector(".phase__status").classList.remove("hidden");
        // Compare the two picks
        if (rps[i] === rps[0] && rps[randNum] === rps[1]) {
          document.querySelector(".phase__status-text").textContent =
            "You lose";
          console.log("You lose");
          document
            .querySelector(".phase__pick--house .icon__winner")
            .classList.remove("hidden");
          score--;
          document.querySelector(".header__score").textContent = score;
        } else if (rps[i] === rps[0] && rps[randNum] === rps[2]) {
          document.querySelector(".phase__status-text").textContent = "You win";
          console.log("You win");
          document
            .querySelector(".phase__pick--player .icon__winner")
            .classList.remove("hidden");
          score++;
          document.querySelector(".header__score").textContent = score;
        } else if (rps[i] === rps[1] && rps[randNum] === rps[0]) {
          document.querySelector(".phase__status-text").textContent = "You win";
          console.log("You win");
          document
            .querySelector(".phase__pick--player .icon__winner")
            .classList.remove("hidden");
          score++;
          document.querySelector(".header__score").textContent = score;
        } else if (rps[i] === rps[1] && rps[randNum] === rps[2]) {
          document.querySelector(".phase__status-text").textContent =
            "You lose";
          console.log("You lose");
          document
            .querySelector(".phase__pick--house .icon__winner")
            .classList.remove("hidden");
          score--;
          document.querySelector(".header__score").textContent = score;
        } else if (rps[i] === rps[2] && rps[randNum] === rps[0]) {
          document.querySelector(".phase__status-text").textContent =
            "You lose";
          console.log("You lose");
          document
            .querySelector(".phase__pick--house .icon__winner")
            .classList.remove("hidden");
          score--;
          document.querySelector(".header__score").textContent = score;
        } else if (rps[i] === rps[2] && rps[randNum] === rps[1]) {
          document.querySelector(".phase__status-text").textContent = "You win";
          console.log("You win");
          document
            .querySelector(".phase__pick--player .icon__winner")
            .classList.remove("hidden");
          score++;
          document.querySelector(".header__score").textContent = score;
        } else {
          document.querySelector(".phase__status-text").textContent = "A tie";
          console.log("A tie");
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
  document.querySelector(".phase--classic").classList.remove("hidden");
  document.querySelector(".phase__comparism").classList.add("hidden");
  document.querySelector(".phase__pick--house .icon").classList.add("hidden");
  for (let i = 0; i < rps.length; i++) {
    document.querySelectorAll(".phase__pick .icon").forEach((e) => {
      e.classList.remove(`icon--${rps[i]}`);
    });
  }
  document.querySelector(".phase__status").classList.add("hidden");
});

// Show modal

// Hide modal
