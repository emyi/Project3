var express = require('express');
var coursesController = express.Router();


var yelp = require("yelp").createClient({
  consumer_key: "gOanrYMzPGTdam4TwP9B2w",
  consumer_secret: "FZyY6BNvCVuByBB3Evd8DNAYSfI",
  token: "RRoT7a1gBwZhJ5J_9QPNDSJx87oTc2nX",
  token_secret: "JPKdScBmCDet96mFqsxMkAzis6Q"
});


// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({term: "golf", location: "Los Angeles"}, function(error, data) {
  console.log(error);
  console.log(data);
});


coursesController.get('/', function(req, res) {
  var location = req.query.searchTerm;
	yelp.search({term: "golf", location: "Los Angeles"}, function(error, data) {
		console.log('go');
		// console.log(data);
    res.render('index', {
      courses: data.businesses
    });
	});
});

coursesController.get('/courses', function(req, res) {
  // var id = req.params.id;
  // console.log(req.params.name);
  res.render('courses/show.ejs');
});


module.exports = coursesController;