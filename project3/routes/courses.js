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

// See http://www.yelp.com/developers/documentation/v2/business
// yelp.business("yelp-san-francisco", function(error, data) {
//   console.log(error);
//   console.log(data);
// });

coursesController.get('/', function(req, res) {
	
	yelp.search({term: "golf", location: "Los Angeles"}, function(error, data) {
		console.log(error);
		console.log(data);
    res.render('index', {
      courses: data.businesses
    });
	});
});


module.exports = coursesController;