"use strict";
const classic = document.querySelectorAll(".phase--classic .icon");
console.log(classic);

const rps = ["rock", "paper", "scissors"];
for (let i = 0; i < classic.length; i++) {
  // console.log(e.classList.contains("icon--rock"));
  e.addEventListener("click", (e) => {
    // e.stopPropagation();
    console.log(e.currentTarget.classList.contains(`icon--rock`));
  });
}

// const playerPick = () => {};
