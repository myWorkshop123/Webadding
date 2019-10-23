

// Click detection

for (var count = 0; count < numberOfDrums; count++) {
  // add listeners to each button

    
    document.addEventListener("click", function() {
      console.log(this.innerText); // this is used to tell which button triggered the click action

      // playSound(this.innerText);

      // Another method cam also be used
      var whoPressed = this.innerText;
      makeSound(whoPressed);
    });
}

// Keypress detection 
document.addEventListener("keydown", function(event) {
  makeSound(event.key);
});

function makeSound(key) {
  switch (key) {
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
}
