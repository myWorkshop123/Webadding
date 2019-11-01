var firstNumber = Document.getElementByClass("FirstNumber").innerHtml;
var secondNumber = Document.getElementByClass("SecondNumber").innerHtml;
var result = firstNumber + secondNumber;

Document.getElementByClass("result").innerHtml = result;

alert(result);
