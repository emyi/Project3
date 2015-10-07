var express = require('express');
var gamesController = express.Router();
var User = require('../models/user.js');
var Course = require('../models/course.js');


gamesController.get('/confirm', function(req, res) {
	res.render('layout');
});

gamesController.get('/group', function(req, res) {
	res.send('hello');
});

module.exports = gamesController;