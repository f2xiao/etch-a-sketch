const gridContainer = document.querySelector(".grid-container");
const slider = document.querySelector(".slider");
const gridSize = document.querySelector("#grid-size");
let cells;
let gridNumber = slider.value;
gridSize.textContent = gridNumber;

slider.addEventListener("change", function (e) {
  gridNumber = e.target.value;
  gridSize.textContent = gridNumber;
  deleteBoard();
  createBoard(gridNumber);
});

const deleteBoard = function () {
  cells.forEach((cell) => {
    cell.remove();
  });
};

const createBoard = function (gridNumber) {
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
      e.target.classList.add("cell-active");
    });
  });
};

createBoard(gridNumber);
