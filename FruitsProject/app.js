// jshint esversion:6

const MongoClient = require('mongodb').MongoClient; // required Module 
const assert = require('assert'); // I forgot what it used to do 

// connection url 
const url = 'mongodb://localhost:27017';  // the server address where the mongodb will be running 


// database name 
const dbName = 'fruitsDB';

// Create a new MongoClient 

const client = new MongoClient(url , {useUnifiedTopology:true});  // client is used to connect to the server 




// Used Connect method to connect to the server 
client.connect(function(err) {
    assert.equal(null,err);
    console.log("Connected successfully to the server");

    const db = client.db(dbName);

   

   insertDocument(db , function(){
       findDocuments(db , function(){
           client.close();

       });
       

       
   });




});
 const insertDocument = function(db , callback) {
        // Get the documents collection
        const collection = db.collection('FruitList');
        collection.insertMany([
            {_id:1 ,name:'Apple' ,  cost:100 , stock:32 } , 
            {_id:2,name: 'Pineapple' , cost:150 , stock:44} , 
            {_id:3 ,name:'Guava' , cost:50 , stock:50}
        ] , function(err,result) {
            assert.equal(err , null) ;
            assert.equal(3 , result.result.n);
            assert.equal(3,result.ops.length);
            console.log("Inserted 3 documents into the collection");
            callback(result);
            
            
        
        } 
        
        );


    };


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