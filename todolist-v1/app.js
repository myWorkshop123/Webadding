// jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var nameOfDays = ['sunday', 'monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'];
var items = ["Buy Food",
"Cook Food",
    "Eat Food"];
var workItems = [];
var postPage = "";



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');


app.listen(3000, function () {

    console.log("the server has started");


});



app.get("/", function (req, res) {

    let date = require(__dirname + "/date.js");
    
    let day  = date.getDay();

    res.render("list", { kindOfDay: day, tempItem: items, btnrequest: postPage });
    
});


app.get("/work", function (req, res) {
    postPage = "work";
    res.render("list", { kindOfDay: "Work", tempItem: workItems,btnrequest:postPage });

});

app.get("/about", function (req, res) {
    res.render("about");

});




app.post("/", function (req, res) {
    if (req.body.button === 'work') {
        var newItem = req.body.textItem;
        workItems.push(newItem);
        res.redirect("/work");

    } else {
        var item = req.body.textItem;

        items.push(item);

        res.redirect("/");

        
    }



});
