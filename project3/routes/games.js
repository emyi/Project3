var express = require('express');
var gamesController = express.Router();
var User = require('../models/user.js');
var Course = require('../models/course.js');
var Game = require('../models/game.js');

var mongoose = require('mongoose');

gamesController.get('/confirm', function(req, res) {
	res.render('layout');
});

gamesController.get('/group/new', function(req, res) {
	User.findByIdAsync(req.params.id).then(function(user) {
		if(req.session && req.session.email){
			User.findOne({ email: req.session.email}).then(function(user, err){
				res.render('games/new', {
					curr_user: user
				});
			});
		}else{
			res.render('games/new', {
				curr_user: null
			});
		}
	}).catch();
});


gamesController.get('/group/join/:id', function(req, res) {
	//grabs user id from 'join' A tag on
	console.log("user_id: " + req.params.id);
	User.findByIdAsync(req.params.id).then(function(user) {
	});
});

//user creating game
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

//user joining existing game
gamesController.get('/group/add/:gameid', function(req, res) {
	console.log("ENTERED FUNCTION");
	User.findOne({ email: req.session.email}).then(function(user, err) {
		var game_id = req.params.gameid;
		console.log(game_id);
		Game.findByIdAsync(game_id).then(function(game, err) {
			console.log("user id: " + user.id);
			game.user_ids.push(user.id);
			game.saveAsync().then(function(game) {
			});
		}).catch(function(err) {console.log(err)});
	});
});


module.exports = gamesController;
