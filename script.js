"use strict";
const classic = document.querySelectorAll(".phase--classic .icon");

const rps = ["rock", "paper", "scissors"];

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

      setTimeout(() => {
        // show what the house picked
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
      }, 1000);
    }
  });
}

// const playerPick = () => {};
