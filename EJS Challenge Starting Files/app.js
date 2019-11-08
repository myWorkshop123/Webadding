//jshint esversion:6
const ld = require('lodash');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const posts = [];
const app = express();


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.listen(3000, function() {
  console.log("Server started on port 3000");
});

app.get("/", function(req, res) {
  let postRecieved = posts;
  res.render("home.ejs", {
    insideContent: homeStartingContent,
    submittedPosts: postRecieved
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    insideContent: aboutContent
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    insideContent: contactContent
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  let post = {
    mainTitle: req.body.titleTextBox,
    mainBody: req.body.postTextbox
  };
  posts.push(post);
  res.redirect("/");
});


app.get("/posts/:post", function(req, res) {
  var convertToSnake = ld.snakeCase(req.params.post);
  if (checkPresence(convertToSnake).isFound === true) {
    let postObject = checkPresence(convertToSnake);
    res.render("post", {
      postHeading: postObject.Title,
      postContent: postObject.Content
    });
  } else {
    console.log("Match not found ");
  }
});


function checkPresence(value) {
  console.log(posts);
  for (var count = 0; count < posts.length; count++) {
    var returnObject = {};
    var loopWord = ld.lowerCase(posts[count].mainTitle);
    var valueWord = ld.lowerCase(value);

    if (loopWord == valueWord) {
      returnObject = {
        isFound: true,
        Title: posts[count].mainTitle,
        Content: posts[count].mainBody
      };
      return returnObject;

    } else {
      returnObject = {
        isFound: false,
        Title: 'none',
        Content: 'none'
      };


    }
  }


}
