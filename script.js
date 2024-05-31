// Determine main word of game
const word = "tiger";

// Get elements
let inputs = document.querySelectorAll(".input-box-now");
const container = document.querySelector(".container");
const buttons = document.querySelectorAll(".btn");
const deleteButton = document.querySelector(".delete");
const enterButton = document.querySelector(".enter");

// Initialize variables
let currentInputIndex = 0;
let guessedLetters = "";
let correctLetters;
let chance = 0;
let win = correctLetters == inputs.length;
let lost = chance >= 6;

// Check guessed word
function checkWord(guessedWord) {
  correctLetters = 0;
  let incorrectLetters = 0;
  let correctIndex = [];
  // Check if the guessed word letters matches the main word
  for (let i = 0; i < word.length; i++) {
    if (guessedWord[i] === word[i]) {
      correctLetters++;
      correctIndex.push(i);
    } else if (word.includes(guessedWord[i])) {
      incorrectLetters++;
    }
  }
  // Update the input boxes and buttons
  inputs.forEach((input, index) => {
    inputs.forEach((input, index) => {
      if (correctIndex.includes(index)) {
        input.style.backgroundColor = "#7ABA78";
        buttons.forEach((button) => {
          if (button.dataset.key === guessedWord[index]) {
            button.style.backgroundColor = "#7ABA78";
          }
        });
      } else if (word.includes(guessedWord[index])) {
        input.style.backgroundColor = "#F3CA52";
        buttons.forEach((button) => {
          if (button.dataset.key === guessedWord[index]) {
            button.style.backgroundColor = "#F3CA52";
          }
        });
      } else {
        input.style.backgroundColor = "dimgray";
        buttons.forEach((button) => {
          if (button.dataset.key === guessedWord[index]) {
            button.style.backgroundColor = "dimgray";
          }
        });
      }
    });
  });
  // Update the game state
  chance++;
  lost = chance >= 6;
  win = correctLetters == inputs.length;
  // Reset the game if the player has not won or lost
  if (!win && !lost) {
    inputs.forEach((element) => element.classList.remove("input-box-now"));
    const form = document.createElement("form");
    form.innerHTML = `
      <input type="text" class="input-box input-box-now" />
      <input type="text" class="input-box input-box-now" />
      <input type="text" class="input-box input-box-now" />
      <input type="text" class="input-box input-box-now" />
      <input type="text" class="input-box input-box-now" />
    `;
    container.appendChild(form);
    inputs = document.querySelectorAll(".input-box-now");
    guessedLetters = "";
    currentInputIndex = 0;
  }
}

// Handle keyboard events
document.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && currentInputIndex == 5) {
    checkWord(guessedLetters);
  } else if (
    event.key !== "Backspace" &&
    event.key !== "Enter" &&
    currentInputIndex < inputs.length
  ) {
    for (let i = 0; i < word.length; i++) {
      if (inputs[currentInputIndex].value !== "") {
        continue;
      } else {
        inputs[currentInputIndex].value = event.key;
        guessedLetters += event.key;
        currentInputIndex++;
        break;
      }
    }
  } else if (event.key == "Backspace" && currentInputIndex > 0) {
    currentInputIndex--;
    inputs[currentInputIndex].value = "";
  }
});

// Handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-key");
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: key, bubbles: true })
    );
  });
});
