const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const rp = require('request-promise');
const cheerio = require('cheerio');

const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

var mealid = [];
var linkid = [];
var mealarray = [];

app.get('/', (req, res, ) =>{
    res.render('input')
})

app.post('/', (req, res) =>{
    let newmealid = req.body.mealid;
    mealid.push(newmealid);
    linkid.push(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${newmealid}`);
    if (req.body.postid == 'addmore'){
        req.flash('success_msg',newmealid + ' successfully added');
        res.redirect(`/`);
    }else{
        for (var k = 0; k < linkid.length; k++){
            const url = linkid[k];
            console.log(url);
            rp(url)
              .then(function(html){
                var mealjson = JSON.parse(html).meals[0];
                for(var j in mealjson)
                mealarray.push([j, mealjson [j]]);
                for (i = 9; i < 29; i++) {
                    console.log(mealarray[i][1])
                    if (mealarray[i][1]===''){
                    break
                    }
                }
                req.flash('success_msg',newmealid + ' is the meal with the least ingredient');
                res.redirect(`/`);
              })
              .catch(function(err){
                console.error;  
              });
        }

    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
