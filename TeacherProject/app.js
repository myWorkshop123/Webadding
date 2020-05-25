//jshint esversion:6


require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const selectedSubjects = [];
var currentUser = [];


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', true);


// Schemas
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  rank: Number,
  subSelected: []

});

const subjectSchema = new mongoose.Schema({
  name: String,
  isSelected: Number
});




userSchema.plugin(passportLocalMongoose);
// For using the findOrCreate function defined in the passport-google-oauth20 module
userSchema.plugin(findOrCreate);



const User = new mongoose.model("User", userSchema);
const Subject = new mongoose.model("Subject", subjectSchema);


passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});



// Routes

//Get Routes

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/secrets", function (req, res) {
  User.find({ userSecret: { $exists: true } }, function (err, docs) {
    res.render('secrets', {
      UserSecrets: docs
    });

    });

});

app.get('/chosenSubjects', function (req, res) {
  User.find({ username: req.user.username }, function (err, foundUser) {
    if (err) { console.log(err); }
    else {
      if (foundUser) {
        res.render('chosenSubjects', {
          teacherName: foundUser[0].username, 
          visibleSubjects: foundUser[0].subSelected
          
          
        })
      
      }
    }
  })
})


app.get('/subjects', function (req, res) {
  if (req.isAuthenticated()) {
    Subject.find({ isSelected: 0 }, function (err, docs) {
      res.render('subject', {
        visibleSubjects: docs
      })
    })
    
  } else {
    res.redirect('/login');
  }



})





app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get('/submit', function (req, res) {
  if (req.isAuthenticated()) {
    res.render('submit');
  }
  else {
    res.redirect('/login');
  }
});




// Post routes start here 

app.post('/updateRank', function (req, res) {
  const rank = req.body.rank;
  console.log('rank', rank);



  const Username = currentUser.pop();
  const userId = req.user._id;
  User.findById(userId, function (err, foundUser) {
    if (err) { console.log(err); }
    else {
      if (foundUser) {
        console.log('foundUser in secrets', foundUser);
        foundUser.rank = rank;
        foundUser.save();
        res.redirect('/logout');

        
      }
    }
  })

  
  // User.find({ username: req.user._id }, function (err, foundUser) {
  //   if (err) { console.log(err); }
  //   else {
  //     if (foundUser) {
  //       foundUser[0].rank = rank;
  //       foundUser[0].save();
  //       res.redirect('/logout');

  //     }
  //   }
  // })



})
app.post('/selectedSubject', function (req, res) {
  const newObj = req.body;
  console.log('this is the user ',req.user);

  // For getting the keys
  for (let value of Object.keys(newObj)) {

    selectedSubjects.push((value));
  }

  selectedSubjects.forEach((eachSubject) => {
    console.log('eachSubject', eachSubject);
    Subject.find({ name: eachSubject }, function (err, foundSubject) {
      if (err) { console.log(err); }
      else {
        if (foundSubject) {

          const newSub = foundSubject[0];
          newSub.isSelected = 1;

          // making changes in the user's database
          User.find({ username:req.user.username }, function (err, foundUser) {
            if (err) { console.log(err); }
            else {
              if (foundUser) {
                // Add the sub selected to the database 
                // But Before that we will check if it is already present in db 

                if ((foundUser[0].subSelected).includes(newSub.name) === false) {
                  foundUser[0].subSelected.push(newSub.name);
                }

                foundUser[0].save();
              }
            }
          })

          newSub.save();

        }
        else {
          console.log('User not found');

        }
      }
    })

    // ForEach loop ends here
  })

  res.redirect('/chosenSubjects');

})

app.post("/register", function (req, res) {
  User.register({ username: req.body.username }, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      currentUser.push(user.username);
      passport.authenticate("local")(req, res, function () {
        req.user.rank = req.body.rank;
        
        res.redirect("/secrets");
      });
    }
  });

});



app.post("/login", function (req, res) {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  currentUser.push(user.username);


  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        
        res.redirect('/checkRank');
      


      });
    }
  });

});

app.get('/checkRank', function (req, res) { 
  // Get the rank of the logged in user 
  const currentUserRank = req.user.rank;
  var answer = 1;

  const lowerRankUsers = [] // This will contain all those users with high rank and who haven't registered
  User.find({ rank: { $lt: currentUserRank } }, function (err, foundUser) {
    if (err) { console.log(err); }
    else {
      if (foundUser) {
        // This will return an array of all the foundUsers
        foundUser.forEach(function (user) {
          if (user.subSelected.length === 0) {
            lowerRankUsers.push(user.username);
          }
        })

        if (lowerRankUsers.length != 0) {
          res.render('usersRemaining', {
            remainingTeachers: lowerRankUsers
          });

        } else {
          res.redirect('/subjects');

        }

      }
    }
  })

})



app.post('/submit', function (req, res) {
  // Check whether the user is still authenticated 
  if (req.isAuthenticated()) {
    const submittedSecret = req.body.secret;
    const userId = req.user._id;
    User.findById(userId, function (err, foundUser) {
      if (err) { console.log(err); }
      else {
        if (foundUser) {
          
          foundUser.userSecret = submittedSecret;
          foundUser.save(function () {
            res.redirect('/secrets');

          });
        }
      }
    });
  }
  else {
    res.redirect('/login');
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
