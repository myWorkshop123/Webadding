//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
mongoose.set('useFindAndModify', false);
const _ = require("lodash");



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


app.listen(port, function () {
  console.log("Server started Successfully ");
});


mongoose.connect("mongodb+srv://admin-kartik:test123@cluster0-nj1qi.mongodb.net/todolistDb", { useNewUrlParser: true, useUnifiedTopology: true });


// Database Schema 

const itemsSchema = mongoose.Schema({
  name: String
});

const listSchema = mongoose.Schema({
  name: String,
  items: [itemsSchema]

});

// Collection Name
const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("list", listSchema);



// Default Documents 

const DataStructure = new Item({
  name: "Data Structure "
});

const Excercise = new Item({
  name: "Excercise"
});


const Programming = new Item({
  name: "Programming"
});


const defaultArray = [DataStructure, Excercise, Programming];

app.get("/", function (req, res) {
  Item.find({}, function (err, results) {
    if (results.length === 0) { // If there is nothing in the collection then insert the default values  
      // Create new Document
      Item.insertMany(defaultArray, function (err) { // Item is the name of the collection
        if (err) {
          console.log(err);
        } else { console.log("Successfully inserted default values "); }
      });
      res.redirect("/");
    } else {
      // Read the old document 
      //      or 
      // Read the default values which are already added to the website 
      res.render("list", { listTitle: "Today", newListItems: results });
    }
  });

});



// Configure the custome routes for adding the functionality of the Custom List 
// Although the same procedure will be followed over here too which we have followed in app.get("/") method

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        // Create new list 
        const list = new List({
          name: customListName,
          items: defaultArray
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // Show the old list 
        res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
      }
    }
  });
});



app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    /*  
 Instead of using the InsertMany method for storing the 
 document into the collections by adding it into the array as you
 can see above ,
 we are using a shortcut mongoose method which is the model.save() method 
 */
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item); // In the <items> field of the list collection from which foundList Document have been fetched item is being inserted 
      foundList.save();
      res.redirect("/" + listName);



    });
  }
});





/* When the user taps/clicks the checkbox for deletion of the document then the request is sent to this route */
app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox; // ID of the item to be deleted 
  const listName = req.body.listName; // Name of the list to which it belongs 


  if (listName === "Today") {
    // We are on the Default list 

    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("Successfully deleted checked item ");
        res.redirect("/");
      }
    });
  } else {

    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, function (err, foundList) {
      if (!err) {
        res.redirect("/" + listName);
      }
    });

  }





});
