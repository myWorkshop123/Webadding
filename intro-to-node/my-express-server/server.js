// jshint esversion:6

const express = require("express");
const app = express();

app.listen(3000, function() {
  console.log("Server is listening to the port 3000");
});

// to response to the request made by the browser
app.get("/", function(req, res) {
  console.log(req);
  res.send("this is the home page ");
});

app.get("/contacts", function(req, res) {
  res.send("this is the contact page ");
});

app.get("/about", (req, res) => {
  res.send("this is the about page , and i am kartik ");
});
