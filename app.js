const express = require("express");
const mongoose = require('mongoose');


/**Connect to DB **/
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//Check connection
db.once('open', () => console.log("Connected to MongoDB"));
//Check for db errors
db.on('error', (err) => console.log(err));

const path = require('path');

//Bring in Models
let Article = require('./models/article');

/** Init App **/
const app = express();
const port = 3000;

/*** Init Pug and View Engine ***/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// app.get('/', (req, res)=> res.send('Welcome'));
/***Index***/
app.get('/', function(req, res){
  Article.find({}, function(err, articles){
    if (err) {
      console.log(err);
    }else{
      res. render('index', {
        title:"Articles",
        articles: articles
      });
    }
  });
});

/**Add Article Route ***/
app.get('/article/add', (req, res) =>
  res.render('add_article', {
    title: 'Add Article'
}));

/***About Us ***/
app.get('/about', (req, res) => res.render('about'));

console.log(__dirname);
app.listen(3000, ()=> console.log("Listening to port 3000..."));
// app.listen(3000, function(){
//   console.log('Listening to port 3000...')
// })
