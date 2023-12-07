"use strict";
const classic = document.querySelectorAll(".phase--classic .icon");
console.log(classic);

for (let i = 0; i < classic.length; i++) {
  const e = classic[i];
  // console.log(e.classList.contains("icon--rock"));
  e.addEventListener("click", (e) => {
    // e.stopPropagation();
    console.log(e.currentTarget);
  });
}

// const playerPick = () => {};
