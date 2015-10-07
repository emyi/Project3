var express = require('express');
var gamesController = express.Router();
var User = require('../models/user.js');
var Course = require('../models/course.js');
var Game = require('../models/game.js');


gamesController.get('/confirm', function(req, res) {
	res.render('layout');
});

gamesController.get('/group/new', function(req, res) {
	res.render('games/new');
});

module.exports = gamesController;
