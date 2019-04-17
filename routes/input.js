const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');

const router = express.Router();

var mealid = [];
var linkid = [];
var mealarray = [];

//get the meal ids
router.get('/', (req, res, ) =>{
    res.render('input');
});

//save the meal ids
router.post('/', (req, res) =>{
    let newmealid = req.body.mealid;
    mealid.push(newmealid);
    linkid.push(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${newmealid}`);
    
    //add more meal ids
    if (req.body.postid == 'addmore'){
        req.flash('success_msg',newmealid + ' successfully added');
        res.redirect(`/`);
    }
    //submit all meal ids and get the result
    else{
        for (var k = 0; k < linkid.length; k++){
            const url = linkid[k];
            console.log(url);
            
            //read themealdb api for the inputted mealids
            rp(url)
              .then(function(html){
                var mealjson = JSON.parse(html).meals[0];
                for(var j in mealjson){
                    mealarray.push([j, mealjson [j]]);
                }
                
                //read the ingredients of the inputted mealids
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

module.exports = router;
