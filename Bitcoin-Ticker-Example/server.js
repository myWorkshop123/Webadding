//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
  console.log("the server has started");
});

app.post("/", function (req, res) {
  var myUrl =
    "https://apiv2.bitcoinaverage.com/indices/global/ticker/" +
    req.body.crypto +
    req.body.fiat;
  var anotherUrl =
    "https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2";

  request(myUrl, function (error, response, body) {
    var answer = JSON.parse(body);
    console.log(answer.ask);

    res.send("<h1>the price is " + answer.ask + "</h1>");
  });
});

// The conversion page

app.get("/cc", function (req, res) {
  res.sendFile(__dirname + "/convert.html");
});



app.post("/cc", function (req, res) {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var conversionUrl =
    "https://apiv2.bitcoinaverage.com/convert/global?from=" + crypto + "&to=" + fiat + "&amount=" + amount;



  request(conversionUrl, function (error, response, body) {
    
    var convertedValue = JSON.parse(body);

    console.log(convertedValue.price);

    var price = convertedValue.price;

    res.write("the converted values is " + price);
    res.send();
    



  })
});
