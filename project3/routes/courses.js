var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

// function for yelp api call

var request_yelp = function(set_paramaters, callback) {

	//type of request
	var httpMethod = 'GET';

	//url used for request
	var url = 'http://api.yelp.com/v2/search';

	var default_parameters = {
		term: 'golf',
		location: 'Los Angeles'
		sort: '2'
	};

	var required_parameters = {
		oauth_consumer_key : process.env.YELP_CONSUMER_KEY,
		oauth_token : process.env.YELP_TOKEN,
		oauth_nonce : n(),
		oauth_timestamp : n().toString().substr(0,10),
		oauth_signature_method : 'HMAC-SHA1',
		oauth_version : '1.0'
	};

	var parameters = _.assign(default_parameters, set_paramaters, required_parameters);

	var consumerSecret = process.env.YELP_CONSUMER_SECRET;
	var tokenSecret = process.env.YELP_TOKEN_SECRET;

	//call yelp's oauth 1.0a server

	var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, {encodeSignature: false});

	parameters.oauth_signature = signature;

	var paramURL = qs.stringify(parameters);

	var apiURL = url+'?'+paramURL;

	request(apiURL, function(error, response, body) {
		return callback(error, response, body);
	});
};