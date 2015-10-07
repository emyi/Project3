var express = require('express');
var coursesController = express.Router();
var Game = require('../models/game.js');


var yelp = require("yelp").createClient({
  consumer_key: "gOanrYMzPGTdam4TwP9B2w",
  consumer_secret: "FZyY6BNvCVuByBB3Evd8DNAYSfI",
  token: "RRoT7a1gBwZhJ5J_9QPNDSJx87oTc2nX",
  token_secret: "JPKdScBmCDet96mFqsxMkAzis6Q"
});
yelp.search({term: "bars", location: "Los Angeles"}, function(error, data) {
  //console.log(error);
  //console.log(data);
});

// See http://www.yelp.com/developers/documentation/v2/business
yelp.business("yelp-san-francisco", function(error, data) {
  //console.log(error);
  //console.log(data);
});
coursesController.get('/', function(req, res){
  yelp.search({term: "golf", location: "Los Angeles"}, function(error, data) {
      //console.log(error);
      //console.log(data);
      res.render('homepage');

  });
});
coursesController.get('/courses', function(req, res){
  console.log('go')
  var location = req.query.searchTerm;
  // res.redirect('/term');

  yelp.search({term: "golf", location: location}, function(error, data) {
    console.log(error);
    console.log(data);
    // res.json(data.businesses);
    res.render('courses/index.ejs', {courses: data.businesses})
  });
});

coursesController.get('/courses/:id', function(req, res){
  yelp.business(req.params.id, function(error, data){
      if(req.session && req.session.email){
        User.findOne({ email: req.session.email}).then(function(user, err){
          Game.findAsync({course_id: req.params.id}).then(function(games, err){
            console.log(games);
            res.render('courses/show.ejs', {
              course: data,
              games: games,
              curr_user: user.email
            });
          });
        });
      }else{
        Game.findAsync({course_id: req.params.id}).then(function(games, err){
            console.log(games);
            res.render('courses/show.ejs', {
              course: data,
              games: games,
              curr_user: null
            });
          });
      }
  });
});







// See http://www.yelp.com/developers/documentation/v2/search_api
// yelp.search({term: "golf", location: "Los Angeles"}, function(error, data) {
//   console.log(error);
//   console.log(data);
// });


// coursesController.get('/', function(req, res) {
//   var location = req.query.searchTerm;
// 	yelp.search({term: "golf", location: "Los Angeles"}, function(error, data) {
// 		console.log('go');
// 		// console.log(data);
//     res.render('index', {
//       courses: data.businesses
//     });
// 	});
// });

// coursesController.get('/courses', function(req, res) {
//   // var id = req.params.id;
//   // console.log(req.params.name);
//   res.render('courses/show.ejs');
// });


module.exports = coursesController;