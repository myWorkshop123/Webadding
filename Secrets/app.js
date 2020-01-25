//jshint esversion:6

//TODO register and login tempelates have the type of email in their input method of email not text 

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose deprecation warnings



mongoose.connect("mongodb://localhost:27017/SecretUsers", { useNewUrlParser: true, useUnifiedTopology: true });



// Database Schema 

const userSchema = new mongoose.Schema({
    username: String,
    password: String
    
});

const secret = process.env.SECRET;



// Database Model

const User = mongoose.model('User', userSchema);




app.listen(3000, (req, res) => { console.log("The server has started at port 3000"); });

app.get('/', (req, res) => {
    res.render('home');
});


app.get('/login', (req, res) => {
    res.render('login');
});



app.get('/register', (req, res) => {
    res.render('register');
});

// getting the user name and password and saving them in the mongo db 

app.post("/register", function (req, res) {

    
    const userName = req.body.username;
    const passWord = req.body.password;

    bcrypt.hash(passWord, saltRounds, function (err, hash) {
        if (!err) {
            const new_user = new User({
                username: userName,
                password: hash
            });
            new_user.save(
                function (err) {
                    if (!err) {
                        res.render('secrets');

                    } else { console.log(err); }
                }
            );

        }
        else {
            console.log(err);
        }
    });    
});

// for Authentication the user 

app.post("/login", function (req, res) {
    const testUser = req.body.username;
    const testPass = req.body.password;
    User.findOne({ username: testUser }, function (err, foundUser) {
        if (err) {
            console.log('this is the error ',err);
        } else {
            if (foundUser) { // If found the user 
                bcrypt.compare(testPass, foundUser.password, function (err, result) {
                    if (err) {
                        console.log(err);
                        
                    } else {
                        if (result === true) {
                            res.render('secrets');
                        } else {
                            res.send('password not matched ');
                        }
                    }
                });

            } else { // It did not found the user 
                res.send('User not found');
            }
        }
    });

    
    
    
    
});

