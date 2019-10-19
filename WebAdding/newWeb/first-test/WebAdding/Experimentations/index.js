var count = 0 ;
var resultingString = "";
var resultingArray = [];

for (count = 0; count < 100 ; count++){
  
  if (count % 3 === 0 && count %5 ===0)
  {
    resultingString="fizzbuzz";

  }
  
  
  else if (count % 3 === 0)
  {
    resultingString += "fizz";
  }
  else if (count % 5 === 0 )  {
    resultingString += "buzz";

    
  }
  else {
    resultingString = count;

  }
  
  
  resultingArray[count]=resultingString;

  resultingString = "";
  
  
  
}

console.log(resultingArray)