const gridContainer = document.querySelector(".grid-container");
const slider = document.querySelector(".slider");
const gridSize = document.querySelector("#grid-size");
const clearButton = document.getElementById("clear");
const blackButton = document.getElementById("black");
const eraserButton = document.getElementById("eraser");
const rgbButton = document.getElementById("rgb");
const colorPicker = document.getElementById("colorpicker");
let cells, gridNumber;
const init = function () {
  gridNumber = slider.value;
  gridSize.textContent = gridNumber;
  createBoard(gridNumber);
  sketch("black");
};

const deleteBoard = function () {
  cells.forEach((cell) => {
    cell.remove();
  });
};

const sketch = function (color) {
  cells.forEach((cell) => {
    cell.classList.add("cell");
    cell.addEventListener("mouseover", function (e) {
      e.target.style.backgroundColor = `${color}`;
    });
    cell.addEventListener("touchmove", function (e) {
      e.target.style.backgroundColor = `${color}`;
    });
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
};

clearButton.addEventListener("click", function () {
  deleteBoard();
  init();
});

init();
slider.addEventListener("change", function (e) {
  deleteBoard();
  init();
});
eraserButton.addEventListener("click", function () {
  sketch("white");
});
blackButton.addEventListener("click", function () {
  sketch("black");
});
const getRandomColor = function () {
  return Math.floor(Math.random() * 255);
};
rgbButton.addEventListener("click", function () {
  let colorRed = getRandomColor();
  let colorGreen = getRandomColor();
  let colorBlue = getRandomColor();
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", function (e) {
      if (colorBlue <= 230 && colorRed <= 230 && colorGreen <= 230) {
        colorBlue += 25;
        colorRed += 25;
        colorGreen += 25;
      } else {
        colorBlue = getRandomColor();
        colorGreen = getRandomColor();
        colorRed = getRandomColor();
      }
      console.log(colorBlue);

      e.target.style.backgroundColor = `RGB(${colorRed},${colorGreen},${colorBlue})`;
    });
  });
});
colorPicker.addEventListener("change", function (e) {
  sketch(e.target.value);
});
