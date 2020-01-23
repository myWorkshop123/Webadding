//jshint esversion:6


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);




app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () { console.log("The server has started at port 3000"); });

mongoose.connect("mongodb://localhost:27017/wikiDB" , {useNewUrlParser:true , useUnifiedTopology:true });

// Collections name

const Article = mongoose.Schema({
    title: String,
    content: String
});

// Model setting up 
const article = mongoose.model('Article', Article);


app.route("/articles")
    
    .get(function (req, res) {
    // reading the database 
    article.find({}, function (err, foundArticles) {
        if (!err) { res.send(foundArticles); }
        else { res.send(err); }
    });

// The Get method ends here 
})
    .post(function (req, res) {

    const newTitle = req.body.title;
    const newContent = req.body.content;

    const newArticle = new article({
        title: newTitle,
        content: newContent
    });
    newArticle.save(function (err) {
        if (!err) { res.send("All the values have been saved in the database"); }
        else { res.send(err); }
    });
// The POST method ends here 

    })
    
    .delete(function (req, res) {
    article.deleteMany({}, function (err) {
        if (!err) { res.send("Everything is deleted Successfully "); }
        else { res.send(err); }
    });

// The delete method ends here 

});




app.route("/articles/:articleName")
    .get(function (req, res) {
        const nameOfArticle = req.params.articleName;
        article.find({ title: nameOfArticle }, function (err, foundArticle) {
        
            if (!err) { res.send(foundArticle); }
            else { res.send(err); }
            
        });

    })
    .put(function (req, res) {
        const nameOfArticle = req.params.articleName;
        article.replaceOne({ title: nameOfArticle },
            { title: req.body.title, content: req.body.content },
            function (err) {
                if (!err) {
                    const details = req.body.title + " " + req.body.content;
                    
                    res.send(details);
                } else {
                    res.send(err);
                }
            });
    });
    