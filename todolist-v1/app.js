// jshint esversion:6
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/todoListDb";
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });


var nameOfDays = ['sunday', 'monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'];
var items = ["Buy Food",
"Cook Food",
    "Eat Food"];
var workItems = [];
var postPage = "";
var changedItems = [];
// Mnogoose server database scheem and model
var latestId = 0;
const thingSchema = new mongoose.Schema({
    _id: Number,
    thing: String
});

const thingModel = mongoose.model('lists', thingSchema);




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');


app.listen(3000, function () {


    thingModel.find(function (err, things) {
        if (err) {
            console.log(err);
        } else {


            things.forEach(function (element) {


                changedItems.push(element.thing);



            });




        }
    });

    console.log("Chal gaya tukka ");
    



});



app.get("/", function (req, res) {

    let date = require(__dirname + "/date.js");



    
    insertNewValues(changedItems);

    
    let day  = date.getDay();

    res.render("list", { kindOfDay: day, tempItem: changedItems, btnrequest: postPage });
    
    

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
        console.log(item + ' <= This is the item');
        
        // finding the latest id for insertion 
        
        
        // insertion in the database 
        items.push(item);
        var ItemInserting = items.pop();
        console.log(ItemInserting  + " this is the item inserted ");
        latestId = changedItems.length;

        insertItemInServer(ItemInserting, latestId);

        res.redirect("/");

        
    }



});


function insertItemInServer(item, index) {
    var newThing = new thingModel({
        _id: index + 1,
        thing: item

    });

    console.log(newThing);

    

    newThing.save();

}

function insertNewValues(localArray){
    thingModel.find(function (err, things) {
        if (err) {
            console.log(err);
        } else {
            var count = 0;
            things.forEach(function (element) {

                if (count <= localArray.length) {
                    count += 1;



                }
                if (count > localArray.length) {
                    changedItems.push(element.thing);

                }

            });
        }
    });
}
