const words = ["HTML", "CSS", "JAVASCRIPT", "WORD", "SEARCH", "PUZZLE"];
const gridSize = 10;
const timerElement = document.getElementById("timer-span");
const wordListContainer = document.getElementById("word-list");
let timer;

function generatePuzzle() {
  const puzzleContainer = document.getElementById("puzzle-container");
  const puzzleTable = document.createElement("table");
  puzzleTable.id = "puzzle";
  puzzleContainer.appendChild(puzzleTable);

  for (let i = 0; i < gridSize; i++) {
    const row = puzzleTable.insertRow();
    for (let j = 0; j < gridSize; j++) {
      const cell = row.insertCell();
      cell.textContent = getRandomLetter();
      cell.id = `cell-${i}-${j}`;
      cell.addEventListener("click", () => toggleHighlight(cell));
    }
  }

  placeWords();
  displayWordList();
}

function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function placeWords() {
  for (const word of words) {
    const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
    const startX = Math.floor(Math.random() * (gridSize - word.length + 1));
    const startY = Math.floor(Math.random() * (gridSize - word.length + 1));

    for (let i = 0; i < word.length; i++) {
      const cell =
        direction === "horizontal"
          ? document.getElementById(`cell-${startX + i}-${startY}`)
          : document.getElementById(`cell-${startX}-${startY + i}`);
      cell.textContent = word[i];
      cell.setAttribute("data-word", word);
    }
  }

  startTimer();
}

function startTimer() {
  let timeLeft = 120;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      alert("Time is up! Your score: " + calculateScore());
    }
  }, 1000);
}

function displayWordList() {
  const wordList = document.createElement("ul");
  wordList.id = "word-list-ul";
  wordListContainer.appendChild(wordList);

  for (const word of words) {
    const listItem = document.createElement("li");
    listItem.textContent = word;
    listItem.id = `word-${word}`;
    wordList.appendChild(listItem);
  }
}


function calculateScore() {
  const highlightedCells = document.querySelectorAll(".highlight");
  let score = 0;

  for (const word of words) {
    let found = true;

    for (const letter of word) {
      const isLetterHighlighted = Array.from(highlightedCells).some(
        (cell) => cell.textContent === letter
      );

      if (!isLetterHighlighted) {
        found = false;
        break;
      }
    }

    if (found) {
      score += 5;
      document.getElementById(`word-${word}`).classList.add("strike-through");
    }
  }

  return score;
}

function toggleHighlight(cell) {
  cell.classList.toggle("highlight");
}

generatePuzzle();
