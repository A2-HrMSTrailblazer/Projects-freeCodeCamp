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
    if (rolls < 3){
        resetRadioOptions();
        rolls++;
        rollDice();
        updateStats();
        getHighestDuplicates(diceValuesArr);
    }
    else {
        alert("You have already rolled 3 times this round.");
    }
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

const updateStats = () => {
    roundElement.innerText = round;
    rollsElement.innerText = rolls;
    totalScoreElement.innerText = score;
};

const updateRadioOption = (index, score) => {
    scoreInputs[index].checked = true;
    scoreInputs[index].disabled = false;
    scoreInputs[index].value = score;
    scoreSpans[index].innerText = `, score = ${score}`;
};

const getHighestDuplicates = array => {
    let count = [0, 0, 0, 0, 0, 0];

    array.forEach(num => {
        count[num - 1]++;
    });
    if (Math.max(...count) >= 3) {
        updateRadioOption(0, array.reduce((a, b) => a + b, 0));
    }
    if (Math.max(...count) >= 4) {
        updateRadioOption(1, array.reduce((a, b) => a + b, 0));
    }
    updateRadioOption(5, 0);
};

const resetRadioOptions = () => {
    scoreInputs.forEach(input => {
        input.checked = false;
        input.disabled = true;
        input.value = 0;
    });
    scoreSpans.forEach(span => {
        span.innerText = "";
    });
};
