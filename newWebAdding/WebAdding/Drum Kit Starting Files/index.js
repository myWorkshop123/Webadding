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
  "w":"tom-1",
  "a":"tom-2",
  "s":"tom-3",
  "d":"tom-4",
  "j":"snare",
  "k":"kick-bass",
  "l":"crash"
}




for (var count = 0; count < numberOfDrums; count++) {
  // add listeners to each button 
  document.querySelectorAll(" .drum")[count].addEventListener("click",function (){
    console.log(this.innerText);  // this is used to tell which button triggered the click action 
    
    playSound(this.innerText);

    });
}

function playSound(word) {
  var sound = listOfDrumClasses[word];
  var address = "sounds/"+sound+".mp3";
  var noise = new Audio(address);
  noise.play();

}

