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
  color = "white";
  rgbFlag = false;
  gridNumber = slider.value;
  gridSize.textContent = gridNumber;
  createBoard(gridNumber);
  cells = gridContainer.querySelectorAll("div");
  cells.forEach((cell) => {
    cell.classList.add("cell");
  });
  gridContainer.addEventListener("mouseover", sketch);
  gridContainer.addEventListener("touchstart", handleStart);
  gridContainer.addEventListener("touchmove", handleMove);
  gridContainer.addEventListener("touchend", handleEnd);
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

let ongoingTouches = [];

function handleStart(evt) {
  evt.preventDefault();
  let touches = evt.changedTouches;
  console.log(touches[0]);
  sketch(touches[0]);
  // Array.from(cells).map((cell) => {
  //   console.log(`cellLeft: ${cell.offsetLeft}`);
  //   console.log(`cellTop: ${cell.offsetTop}`);
  //   console.log(cell.offsetTop);
  // });
}
function handleMove(evt) {
  evt.preventDefault();
  let touches = evt.changedTouches;
  console.log("touches Move");
  // console.log(touches[0]);
  let width = getCellWidth();
  let [x, y] = [touches[0].clientX, touches[0].clientY];
  console.log(x, y);
  console.log("----------------------------------------------");
  let targetCell = Array.from(cells).find(
    (cell) =>
      cell.offsetLeft < x &&
      cell.offsetLeft + width > x &&
      cell.offsetTop < y &&
      cell.offsetTop + width > y
  );
  console.log(targetCell);
  console.log("----------------------------------------------");
  if (targetCell) {
    if (
      !targetCell.style.backgroundColor ||
      targetCell.style.backgroundColor != color
    ) {
      if (rgbFlag) {
        color = generateRandomColor();
      }
      targetCell.style.backgroundColor = color;
    }
  }
}

function handleEnd(evt) {
  evt.preventDefault();
  let touches = evt.changedTouches;
  console.log("touches end");
  sketch(touches[0]);
}

function getCellWidth() {
  let cell = document.querySelector(".cell");
  return cell.offsetWidth;
}

console.log(gridContainer.offsetLeft);
console.log(gridContainer.offsetTop);
