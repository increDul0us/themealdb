const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');

const router = express.Router();

var mealid = [];
var linkid = [];
var empty = [];
var leastarray = []
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
        console.log(mealid);
        for (var k = 0; k < linkid.length; k++){
            const url = linkid[k];
            
            
            //read themealdb api for the inputted mealids
            rp(url)
              .then(function(html){
                var mealjson = JSON.parse(html).meals[0];
                var mealarray = [];
                for(var j in mealjson){
                    mealarray.push([j, mealjson [j]]);
                }
                console.log(url);
                //read the ingredients of the inputted mealids
                for (var i = 9; i < 29; i++) {
                    if (mealarray[i][1]===''){
                        leastarray.push(i-9);
                        console.log(i-9);
                    break
                    return leastarray
                    }
                }
                function indexOfMin(arr) {
                    if (arr.length === 0) {
                        return -1;
                    }

                    var index = 0;
                    var value = arr[0];
                    for (var i = 1; i < arr.length; i++) {
                      if (arr[i] < value) {
                        value = arr[i];
                        index = i;
                      }
                    }
                    console.log (index);
                    return index;
                }
//                req.flash('success_msg',mealid[indexOfMin(leastarray)] + ' is the meal with the least ingredient');
                res.redirect(`/`);
              })
              .catch(function(err){
                console.error;  
              });
        }
                var least = mealid[indexOfMin(leastarray)];
                console.log (least);
    }
});

module.exports = router;
/*
                function func2(thingFromForLoop) {
                    Array.min = function( thingFromForLoop ){
                        return Math.min.apply( Math, thingFromForLoop );
                    };
                    return Array.min(thingFromForLoop)
                }*/