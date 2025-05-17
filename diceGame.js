let listOfAllDice = document.querySelectorAll(".die");
let scoreInputs = document.querySelectorAll("#score-options input");
let scoreSpans = document.querySelectorAll("#score-options span");
let roundElement = document.getElementById("current-round");
let rollsElement = document.getElementById("current-round-rolls");
let totalScoreElement = document.getElementById("total-score");
let scoreHistory = document.getElementById("score-history");
let rollDiceBtn = document.getElementById("roll-dice-btn");
let keepScoreBtn = document.getElementById("keep-score-btn");
let rulesBtn = document.getElementById("rules-btn");
let rulesContainer = document.querySelector(".rules-container");

let isModalShowing = false;
let diceValuesArr = [];

let rolls = 0;
let round = 1;
let score = 0;

rulesBtn.addEventListener("click", () => {
    isModalShowing = !isModalShowing;
    rulesContainer.style.display = isModalShowing ? "block" : "none";
    rulesBtn.innerText = isModalShowing ? "Hide rules" : "Show rules";
});

rollDiceBtn.addEventListener("click", () => {
    rollDice();
});

const rollDice = () => {
    diceValuesArr = [];

    for (let i = 0; i < listOfAllDice.length; i++) {
        let randomValue = Math.floor(Math.random() * 6) + 1;
        listOfAllDice[i].innerText = randomValue;
        listOfAllDice[i].classList.remove("selected");
        diceValuesArr.push(randomValue);
    }

    listOfAllDice.forEach((die, index) => {
        die.innerText = diceValuesArr[index];
    });
};
