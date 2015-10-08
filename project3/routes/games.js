var express = require('express');
var gamesController = express.Router();
var User = require('../models/user.js');
var Course = require('../models/course.js');
var Game = require('../models/game.js');


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


module.exports = gamesController;
