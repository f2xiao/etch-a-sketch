const deleteBoard = function () {
  cells.forEach((cell) => {
    cell.remove();
  });
};

const eraser = function () {
  cells = gridContainer.querySelectorAll("div");
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", function (e) {
      e.target.classList.add(`cell-white`);
    });
  });
};

const createBoard = function (gridNumber, color) {
  for (let i = 0; i < gridNumber; i++) {
    for (let j = 0; j < gridNumber; j++) {
      gridContainer.appendChild(document.createElement("div"));
    }
  }
  gridContainer.style = `grid-template-rows: repeat(${gridNumber}, 1fr);grid-template-columns: repeat(${gridNumber},1fr)`;
  cells = gridContainer.querySelectorAll("div");
  cells.forEach((cell) => {
    cell.classList.add("cell");
    cell.addEventListener("mouseover", function (e) {
      e.target.classList.add(`cell-${color}`);
    });
  });
};

const gridContainer = document.querySelector(".grid-container");
const slider = document.querySelector(".slider");
const gridSize = document.querySelector("#grid-size");
const clearButton = document.getElementById("clear");
const blackButton = document.getElementById("black");
const eraserButton = document.getElementById("eraser");
let cells;
let gridNumber = slider.value;
gridSize.textContent = gridNumber;

createBoard(gridNumber, "black");

clearButton.addEventListener("click", function () {
  cells.forEach((cell) => {
    cell.classList.add("cell-white");
  });
});

slider.addEventListener("change", function (e) {
  gridNumber = e.target.value;
  gridSize.textContent = gridNumber;
  deleteBoard();
  createBoard(gridNumber, "black");
});

blackButton.addEventListener("click", function () {
  deleteBoard();
  createBoard(gridNumber, "black");
});

eraserButton.addEventListener("click", eraser);
