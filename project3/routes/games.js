var express = require('express');
var gamesController = express.Router();
var User = require('models/user');
var Course = require('models/course');


gamesController.get('/confirm', function(req, res) {
	res.render('layout');
});

module.exports = gamesController;