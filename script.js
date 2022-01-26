const gridContainer = document.querySelector(".grid-container");
const slider = document.querySelector(".slider");
const gridSize = document.querySelector("#grid-size");
const clearButton = document.getElementById("clear");
const blackButton = document.getElementById("black");
const eraserButton = document.getElementById("eraser");
const rgbButton = document.getElementById("rgb");
const colorPicker = document.getElementById("colorpicker");
let cells, gridNumber, color;
let rgbFlag = false;
const init = function () {
  rgbFlag = false;
  gridNumber = slider.value;
  gridSize.textContent = gridNumber;
  createBoard(gridNumber);
};

document.addEventListener("DOMContentLoaded", init);

const deleteBoard = function () {
  cells.forEach((cell) => {
    cell.remove();
  });
};
function generateRandomColor() {
  let colorRed = getRandomColor();
  let colorGreen = getRandomColor();
  let colorBlue = getRandomColor();
  if (colorBlue <= 230 && colorRed <= 230 && colorGreen <= 230) {
    colorBlue += 25;
    colorRed += 25;
    colorGreen += 25;
  } else {
    colorBlue = getRandomColor();
    colorGreen = getRandomColor();
    colorRed = getRandomColor();
  }
  return `RGB(${colorRed},${colorGreen},${colorBlue})`;
}

const sketch = function (e) {
  if (rgbFlag) {
    color = generateRandomColor();
  }
  e.target.style.backgroundColor = `${color}`;
};

const createBoard = function (gridNumber) {
  for (let i = 0; i < gridNumber; i++) {
    for (let j = 0; j < gridNumber; j++) {
      gridContainer.appendChild(document.createElement("div"));
    }
  }
  gridContainer.style = `grid-template-columns: repeat(${gridNumber},1fr)`;
  cells = gridContainer.querySelectorAll("div");
  cells.forEach((cell) => {
    cell.classList.add("cell");
  });
  gridContainer.addEventListener("mouseover", sketch);
  gridContainer.addEventListener("touchstart", handleStart);
  gridContainer.addEventListener("touchmove", handleMove);
  gridContainer.addEventListener("touchend", handleEnd);
};

clearButton.addEventListener("click", function () {
  deleteBoard();
  init();
});

slider.addEventListener("change", function (e) {
  deleteBoard();
  init();
});
eraserButton.addEventListener("click", function () {
  rgbFlag = false;
  color = "white";
});
blackButton.addEventListener("click", function () {
  rgbFlag = false;
  color = "black";
});
const getRandomColor = function () {
  return Math.floor(Math.random() * 255);
};
rgbButton.addEventListener("click", function () {
  if (!rgbFlag) {
    rgbFlag = true;
  }
});
colorPicker.addEventListener("change", function (e) {
  rgbFlag = false;
  color = e.target.value;
});

function handleStart(evt) {
  evt.preventDefault();
  let touches = evt.changedTouches;
  console.log(touches);
  for (let i = 0; i < touches.length; i++) {
    console.log(`touchstart: ${i}`);
    sketch(touches[i]);
  }
}
function handleMove(evt) {
  evt.preventDefault();
  let touches = evt.changedTouches;
  console.log("touches Move");
  for (let i = 0; i < touches.length; i++) {
    console.log(`touchstart: ${i}`);
    sketch(touches[i]);
  }
}
function handleEnd(evt) {
  evt.preventDefault();
  let touches = evt.changedTouches;
  console.log("touches End");
}
