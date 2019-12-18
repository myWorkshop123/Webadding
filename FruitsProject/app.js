// jshint esversion:6
const mongoose = require('mongoose');

// connection url 
var url = 'mongodb://localhost:27017';  // the server address where the mongodb will be running 



// database name 
const dbName = '/fruitsDB';


url = url + dbName;


mongoose.connect(url , {useUnifiedTopology:true , useNewUrlParser:true} );

console.log("Sab changa c");

// Mongodb schema like dbms
const FruitSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    rating: Number,
    review: String
});



const Fruit = mongoose.model("Fruit", FruitSchema); // Fruit is the name of the collection


// insertion Operation 

const fruit = new Fruit({
    _id: 1,
    name: "Apple",
    rating: 7,
    review: "Pretty solid fruit "
});

const personSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    age: Number
});


const person = new mongoose.model('person', personSchema);

const john = new person({
    _id: 1,
    name: "John",
    age: 67
});


const parav = new person({ _id: 2, name: "Parav", age: 19 });

const aman = new person({ _id: 3, name: "Aman", age: 19 });

const jatin = new person({ _id: 4, name: "Jatin Kapoor", age: 20 });

// to insert multiple documents

// person.insertMany([parav, aman, jatin], function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Data inserted successfully ");
//     }
// });


person.find({});




const findDocuments = function(db , callback) {

    // Get the documents collection
    const collection = db.collection('FruitList');

    // Find some documents 

    collection.find({}).toArray(function(err , docs){
      assert.equal(err , null);
      console.log("Found the following documents");
      console.log(docs);
      callback(docs);

      
        
    })

}