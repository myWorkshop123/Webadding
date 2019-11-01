//jshint esversion:6

const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // this is will keep all the css and images available for the server to access 



app.listen(3000, function () {
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

    var options = {
        url: 'https://us20.api.mailchimp.com/3.0/lists/851dd7d53',
        method: "POST",
        headers: {
            "Authorization": "kartik1 98d202722ede4910b72d1d038c8dec92-us20"

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
