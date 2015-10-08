var express = require('express');
var gamesController = express.Router();
var User = require('../models/user.js');
var Course = require('../models/course.js');
var Game = require('../models/game.js');


gamesController.get('/confirm', function(req, res) {
	res.render('layout');
});

gamesController.get('/group/new', function(req, res) {
	User.findAsync({}).then(function(users, err) {
		res.render('games/new', {
			users: users
		});
	});
});

gamesController.post('/group/join/', function(req, res) {
    User.findOne({ email: req.session.email}).then(function(user, err){
    	var course = req.body.course_id;

		var game = new Game ({
        	user_ids: [user.id],
        	course_id: course
    	});
    	game.saveAsync().then(function(game){
    		res.json(game);
    	});
	});
});

module.exports = gamesController;
