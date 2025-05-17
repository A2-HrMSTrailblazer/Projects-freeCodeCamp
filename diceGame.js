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

keepScoreBtn.addEventListener("click", () => {
    let selected = document.querySelector("#score-options input:checked");
    if (selected) {
        let selectedValue  = selected.value;
        let achieved = selected.id;
        updateScore(selectedValue, achieved);

        // check if 6 rounds have been played
        // if so, show alert with user's final score after 500 milliseconds
        if (round === 6) {
            setTimeout(() => {
                alert(`Game over! Your final score is ${score}`);
            }, 500);
        }

        scoreInputs.forEach((input, index) => {
            input.checked = false;
            input.disabled = true;
            scoreSpans[index].innerText = "";
        });
        rolls = 0;
        round++;
        updateStats();
    }
    else {
        alert("Please select a score option.");
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

const updateScore = (selectedValue, achieved) => {
    const value = parseInt(selectedValue);

    score += value;
    totalScoreElement.innerText = score;

    const historyItem = document.createElement("li");
    historyItem.innerText = `${achieved} : ${value}`;
    scoreHistory.appendChild(historyItem);
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

const updateRadioOption = (index, score) => {
    scoreInputs[index].checked = true;
    scoreInputs[index].disabled = false;
    scoreInputs[index].value = score;
    scoreSpans[index].innerText = `, score = ${score}`;
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
