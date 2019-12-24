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


const Orange = new Fruit({
    _id: 2,
    name: "Orange",
    rating: 9,
    review: "Easiest to eat "
});
Orange.save();


const banana = new Fruit({
    _id: 3,
    name: "Banana",
    rating: 6,
    review: "Good for metabolism but too much sweet. "
});
banana.save();


const personSchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String, 
        required: [true , 'please enter the name of the person '] 
    },
    age: Number, 

    // database embedding and relationships


    favouriteFruit: FruitSchema
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

const puneet = new person({ _id: 10, name:"Puneet" , age: 20 });
// puneet.save();




const Amy = new person({ _id: 11, name: "Amy", age: 12, favouriteFruit: Orange });
Amy.save();


person.find(function (err, people) {
    if (err) {console.log(err);
    } else {
        // console.log(people);
        
        
        people.forEach(function(element) {
            console.log(element.name);
                
        });
        mongoose.connection.close();

        
    }
});


// Update Operation 

// person.updateOne({ _id: 5 }, { name: "Puneet" }, (err) => {
//     if (err) {console.log(err);
//     } else {console.log("Updated Data Successfully");
//     }
// })

person.updateOne({ name: "John" }, { favouriteFruit: banana }, (err) => {
    console.log("Updated Successfully");
});


// Delete Operation 

// person.deleteOne({ _id: 5 }, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Deleted the data successfully ");
//     }
// });


// Delete Many operation 

// person.deleteMany({ name: "Puneet" }, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Deleted all the records successfully");
//     }
// });

