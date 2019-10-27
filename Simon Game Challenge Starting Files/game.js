var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$("h1").text("Press A to start");



$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



$(".btn").on("click", function (event) {
  var userChosenColor = $(event.currentTarget).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1 )

  



})

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () { nextSequence();} , 1000)
      }


  }
  else 
  {
    console.log("wrong")
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    

    setTimeout(function () {

      $("body").removeClass("game-over");

    }, 1000);
    $("#level-title").text("Game Over Press Any Key to Restart");
    startOver();


    

  }


}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;

  

}

function nextSequence() {
  
  level += 1;
  userClickedPattern = [];
  var randomNumber = generateRandom(0, 4);
  var randomChosenColor = buttonColors[randomNumber];
  
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  console.log(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  
  
  


}

function generateRandom(min , max ) {
  return Math.floor(Math.random() * (max - min) + min);


}

function playSound(name) {
  switch (name) {
    case "red":
      var sound = new Audio("sounds/red.mp3");
      sound.play();
      break;
    
    case "yellow":
      var sound = new Audio("sounds/yellow.mp3");
      sound.play();
      break;
    
    case "green":
      var sound = new Audio("sounds/green.mp3");
      sound.play();
      break;
    case "blue":
      var sound = new Audio("sounds/blue.mp3");
      sound.play();
      break;

  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  },100)
}




function initialTesting() {
  for (var count = 0; count < 3; count++)
  {


  }
  



}



