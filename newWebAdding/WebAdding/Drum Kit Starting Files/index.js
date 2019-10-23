var numberOfDrums = document.querySelectorAll(" .drum").length; // returns an array [""]
var soundArray = [
  "tom-1",
  "tom-2",
  "tom-3",
  "tom-4",
  "crash",
  "kick-bass",
  "snare"
];
var listOfDrumClasses = {
  w: "tom-1",
  a: "tom-2",
  s: "tom-3",
  d: "tom-4",
  j: "snare",
  k: "kick-bass",
  l: "crash"
};

for (var count = 0; count < numberOfDrums; count++) {
  // add listeners to each button
  document
    .querySelectorAll(" .drum")
    [count].addEventListener("click", function() {
      console.log(this.innerText); // this is used to tell which button triggered the click action

      // playSound(this.innerText);

      // Another method cam also be used
      var whoPressed = this.innerText;

      switch (whoPressed) {
        case "w":
          var sound = new Audio("sounds/tom-1.mp3");
          sound.play();

          break;
        case "a":
          var sound = new Audio("sounds/tom-2.mp3");
          sound.play();

          break;
        case "s":
          var sound = new Audio("sounds/tom-3.mp3");
          sound.play();

          break;
        case "d":
          var sound = new Audio("sounds/tom-4.mp3");
          sound.play();

          break;
        case "j":
          var sound = new Audio("sounds/snare.mp3");
          sound.play();

          break;
        case "k":
          var sound = new Audio("sounds/kick-bass.mp3");
          sound.play();

          break;
        case "l":
          var sound = new Audio("sounds/crash.mp3");
          sound.play();

          break;
        default:
          console.log(this.innerText);
          
      }
    });
}

// this is the second method 

function playSound(word) {
  var sound = listOfDrumClasses[word];
  var address = "sounds/" + sound + ".mp3";
  var noise = new Audio(address);
  noise.play();
}
