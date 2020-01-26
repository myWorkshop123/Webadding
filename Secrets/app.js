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
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

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
    password: String,
    googleId: String,
    secret:String 
    
});

const secret = process.env.SECRET;
userSchema.plugin(findOrCreate);

userSchema.plugin(passportLocalMongoose);

// Database Model

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));


app.listen(3000, (req, res) => { console.log("The server has started at port 3000"); });

app.get('/', (req, res) => {
    res.render('home');
});

// for google authentication which appears on both login and register page
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

// Route after the gmail account gets authenticated
app.get('/auth/google/secrets',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect secrets.
        res.redirect('/secrets');
    });

    
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/secrets', function (req, res) {
    User.find({ secret: { $ne: null } }, function (err, foundUsers) {
        if (err){console.log(err);
        } else {
            if (foundUsers) {
                
                res.render('secrets', { usersWithSecrets: foundUsers });
                
            } else {
                console.log('User not found ');
                
                }
        }
        
    });
});

app.get('/submit', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('submit');

    } else {
        res.render('/login');
    }
    
});

app.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
    
});
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

        if (err) {
            console.log(err); // if we are unable to find the user with that username 
        } else {
            // we found the user with that username 
            passport.authenticate('local')(req, res, function () {
                // The user has been authenticated 
                res.redirect('/secrets');
            });
        }
    });


});

// this is where all the magic happens 

app.post('/submit', function (req, res) {
    const submittedSecret = req.body.secret;
    console.log(req.user._id);
    User.findById(req.user._id, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                foundUser.secret = submittedSecret;
                foundUser.save();
                res.redirect('/secrets');
            } else {
                console.log("User not found ");
            }
        }
    });
    
    
});







