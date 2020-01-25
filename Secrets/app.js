//jshint esversion:6

//TODO register and login tempelates have the type of email in their input method of email not text 
require('dotenv').config(); // using the .env file to store the secret keys and passwords


const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'Our little secret ',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

 


// mongoose deprecation warnings



mongoose.connect("mongodb://localhost:27017/SecretUsers", { useNewUrlParser: true, useUnifiedTopology: true });

 

// Database Schema 

const userSchema = new mongoose.Schema({
    username: String,
    password: String
    
});

const secret = process.env.SECRET;
userSchema.plugin(passportLocalMongoose);




// Database Model

const User = mongoose.model('User', userSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



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

app.get('/secrets', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('secrets');

    } else {
        res.redirect('/login');
    }
})

app.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
    
})
// getting the user name and password and saving them in the mongo db 

app.post("/register", function (req, res) {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect('/register');
            
        } else {
            passport.authenticate('local')(req, res, function () {

                // New user have been added to the database 
                res.redirect('/secrets');
            });
        }
    });

});

// for Authentication the user 

app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.username,
        password:req.body.password
    });

    req.login(user, function (err) {

        if (err) {console.log(err); // if we are unable to find the user with that username 
        } else {
            // we found the user with that username 
            passport.authenticate('local')(req, res, function () {
                // The user has been authenticated 
                res.redirect('/secrets');
            });
        }
    })


});

