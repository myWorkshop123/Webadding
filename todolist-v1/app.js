// jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.use('view engine' , 'ejs');


app.listen(3000 , function() {
    console.log("the server has started");


});

app.get("/" , function(req,res) {
    var today = new Date();
    if (today.getDay() === 6 ) {
        res.send("alert('it is a fucking Saturday');")

    }else {
        res.send("alert('It is not Saturday You Fucking Piece of shit');")  

    }
})