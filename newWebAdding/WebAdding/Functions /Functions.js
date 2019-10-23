// Constructor Function
// Constructor function takes some parameters in the function call 
// and inititalises them , thats why it is called a constructor function 



function rectangle(length, breadth,height)
{
    this.length = length;
    this.breadth = breadth;
    this.area = function () {
        console.log("the area is " + this.length * this.breadth);
    }
    // Another function 
    this.display = function () {
        console.log("this is the display function ");
    }

}

// To make an object this is the syntax 
var rect1 = new rectangle(3, 4);
rect1.area();


// This is a kind of ojbect 
// It just has some properties 
// this is just a object and you can change some properties about it 
// but you cannot make new object out of it 
var myCustomCar = {
    color: "red",
    wheels: true,
    numberOfWheels: 4,
    windows: true,
    numberOfWindows: 4,
    tanker: true,
    tankCapacity: "4l",
    model:"2018 C class",
    
}

// Higher Order Function 
// In short higher order function is that function takes another function as a parameter and call another function 
// like this function which is defined and declared below 
// the function which is passed as a paramter is called CallBack Function 


function add(num1, num2) { return num1 + num2;}
function subtract(num1, num2) { return num1 - num2; }
function multiply(num1, num2) { return num1 * num2; }
function divide(num1, num2) { return num1 / num2;}
function calculator(num1, num2, operator) {
    return operator(num1, num2);
}

var addition = calculator(3, 3, add);
console.log(addition);
