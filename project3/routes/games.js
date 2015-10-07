var express = require('express');
var gamesController = express.Router();
var User = require('../models/user.js');
var Course = require('../models/course.js');


gamesController.get('/confirm', function(req, res) {
	res.render('layout');
});

gamesController.get('/group', function(req, res) {
	User.findAsync({}).then(function(users, err) {
		res.render('games/create', {
			users: users
		});
	});
});

module.exports = gamesController;