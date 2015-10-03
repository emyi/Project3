var express = require('express');
var usersController = express.Router();
var User = require('../models/user.js');

usersController.get('/users', function (req, res){
	if(req.session && req.session.email){
		User.findOne({ email: req.session.email}).then(function(user, err){
			console.log(users.length)
			res.render('users/index.ejs', {
				users: users,
				curr_user: user.email
			});
		});
	}else{
		res.render('users/index.ejs', {
			curr_user: null,
			users: users
		});
	}
});

usersController.get('/users/:id', function (req, res){
	User.findByIdAsync(req.params.id).then(function(user){
		res.render('profile.ejs', {
			user: user
		});
	}).catch();
});

usersController.get('/users/new', function (req, res){
	res.render('users/new.ejs')
});

module.exports = usersController;
