const rps = ["rock", "paper", "scissors"];
const rpsls = ["rock", "paper", "scissors", "lizard", "spock"];

check(rps, 1, 0);
// const allPicks = [...rps, ...rpsls];

// console.log(allPicks);

function check(choices, i, randNum) {
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
    ([a, b]) => choices[i] === choices[a] && choices[randNum] === choices[b]
  );
  if (isWin) {
    console.log("you win");
  } else {
    console.log("you lose");
  }
}
