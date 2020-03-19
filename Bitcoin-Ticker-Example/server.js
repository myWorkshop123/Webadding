//jshint esversion:6
require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const ba = require('bitcoinaverage');

var publicKey = process.env.USER_PUBLIC_KEY;
var secretKey = process.env.USER_PRIVATE_KEY;

var restClient = ba.restfulClient(publicKey, secretKey);
var wsClient = ba.websocketClient(publicKey, secretKey);
var symbol_set = 'global';

app.use(express.static("public"))


app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
  console.log("the server has started at port 3000");
});


app.post("/", function (req, res) {
  var symbol = req.body.crypto + req.body.fiat;
  restClient.getTickerDataPerSymbol('global', symbol, function (response) {
    const price = JSON.parse(response);
    res.send("<h1>The price is " + price.ask + "</h1>")
  }, function (error) {
    console.log(error);
  });


});

