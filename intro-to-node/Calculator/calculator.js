// jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// () => { }   it is also a call back function
app.listen(3000, () => {
  console.log("the server has started ");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var firstNum = req.body.num1;
  var secondNum = req.body.num2;
  var result = Number(firstNum) + Number(secondNum);

  res.send("The answer is " + result);
});
