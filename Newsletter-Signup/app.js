//jshint esversion:6

const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // this is will keep all the css and images available for the server to access 



app.listen(3000 , function() {
    console.log("the server has started at port 3000");


});

app.get("/" , function(req,res) {
    res.sendFile(__dirname + "/signup.html");


});

app.post("/",function(req,res) {
    var fName = req.body.firstName;
    var lName = req.body.secondName;
    var userEmail = req.body.email;

    console.log(req.body);

    
    
})