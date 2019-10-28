$(".btn").on("click", function (event) {
    var word = $(event.currentTarget).attr("id");
    playSound(word);
});

var totalSounds = ["red", "green", "blue", "yellow"];

function playSound(word) {
    console.log("this is the value of word " + word);
    switch (word) {
        case "red":
            var sound = new Audio("sounds/red.mp3");
            sound.play();
            break;

        case "blue":
            var sound = new Audio("sounds/blue.mp3");
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
        default:
            console.log(word);
    }
}

function createPattern(lengthOfPattern) {
    for (var count = 0; count < lengthOfPattern; count++) {
        var element = generateInRangeRandom(0, 4);
        var soundToPlay = totalSounds[element];

        setTimeout(playSound(soundToPlay), 2000);


    }
}

function generateInRangeRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);


    // var number = Math.floor(Math.random() * 10);
    // if (number >= min && number < max) {
    //   return number;
    // } else if (number === undefined) {
    //   return generateInRangeRandom(min, max);
    // } else {
    //   return generateInRangeRandom(min, max);
    // }
}

// var firstTesting = prompt("Enter the lengthOfPattern");
createPattern(3);
