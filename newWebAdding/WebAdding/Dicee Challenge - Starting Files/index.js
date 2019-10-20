var imageArray = ["dice1", "dice2", "dice3", "dice4", "dice5", "dice6"];

function generateMyRandom() {
  var number = Math.floor(Math.random() * 10);
  if (number > 0) {
    if (number <= 5) {
      return number;
    }
  }
  if (number === undefined) {
    return 0;
  } else {
    return 0;
  }
}
var choseNumber1 = generateMyRandom();
var chosenImage1 = imageArray[choseNumber1];

document
  .querySelector(".img1")
  .setAttribute("src", "images/" + chosenImage1 + ".png");

var choseNumber2 = generateMyRandom();
var chosenImage2 = imageArray[choseNumber2];

document
  .querySelector(".img2")
  .setAttribute("src", "images/" + chosenImage2 + ".png");

if (choseNumber1 === choseNumber2) {
  document.querySelector(".changeText").innerText = "Draw";
}

if (choseNumber2 > choseNumber1) {
  document.querySelector(".changeText").innerText = "Player 2 Wins";
}
if (choseNumber2 < choseNumber1) {
  document.querySelector(".changeText").innerText = "Player 1 Wins";
}
