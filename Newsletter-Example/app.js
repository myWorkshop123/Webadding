//jshint esversion:6
require('dotenv').config()
const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // this is will keep all the css and images available for the server to access 



app.listen(process.env.PORT || 3000, function () {
    console.log("the server has started at port 3000");


});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");


});

app.post("/", function (req, res) {
    var fName = req.body.firstName;
    var lName = req.body.lastName;
    var userEmail = req.body.email;
    var data = {
        members: [{
            email_address: userEmail,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME:lName
            }

        }
        ]
    };
    



    var jsonData = JSON.stringify(data);
    const url = 'https://us20.api.mailchimp.com/3.0/lists/' + process.env.LIST_ID;
    const username = process.env.USERNAME;
    const api_key = process.env.API_KEY;
    var options = {
        url: url,
        method: "POST",
        headers: {
            "Authorization": username + " "+ api_key

        },
        body: jsonData
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log("Failed " + error);
            
            console.log("Connection with the api failed");


        } else {
            console.log(response.statusCode);
            
            if (response.statusCode === 404) {
                
                res.sendFile(__dirname + "/failure.html");



            }
            else if (response.statusCode === 200) {
                
                res.sendFile(__dirname + "/success.html");


            }
        }
    });


});

app.post("/failure", function (req, res) {
    res.redirect("/");

});
