var express = require('express');
var usersController = express.Router();
var User = require('../models/user.js');

usersController.get('/user', function ( req, res ) {
    User.findAsync({}).then(function (users, err){
        if(req.session && req.session.email){
            User.findOne({ email: req.session.email}).then(function(user, err){
                console.log(users.length)
                res.render('index.ejs',{
                    user: user,
                    curr_user: user.email
                });
            })
        }
        else{
            res.render('index.ejs',{
                curr_user: null,
                user: user
            });
        }
    });
});

usersController.get('/users', function (req, res){
	User.findAsync({}).then(function (users, err){
		if(req.session && req.session.email){
			User.findOne({ email: req.session.email}).then(function(user, err){
				console.log(users.length);
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
});

usersController.get('/users/:id', function (req, res){
	User.findByIdAsync(req.params.id).then(function(user){
		res.render('users/profile.ejs', {
			curr_user: user
		});
	}).catch();
});

usersController.get('/users/:id/edit', function (req, res){
	User.findByIdAsync(req.params.id).then(function(user){
		res.render('users/edit.ejs', {
			curr_user: user
		});
	}).catch();
});

usersController.get('/new', function (req, res){
	res.render('users/new.ejs');
});

//update user info here
usersController.post('/users/:id/update', function (request, response) {
	console.log('here');
  	var id = request.params.id;

	  User.findById(id, function(error, user) {
	    if(request.body.location) user.location = request.body.location;
	    if(request.body.handicap) user.handicap = request.body.handicap;

	    user.save(function(error) {
	    	// response.render('users/profile.ejs');
	      	if(error) response.json({messsage: 'Could not update user b/c:' + error});

	      		// response.json({message: 'User successfully updated'});
	    		response.redirect(303, '/users/' + user.id);  
	    	});
	  	});
});

usersController.post('/users/create', function (req, res){
	var user = new User({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		location: req.body.location,
		handicap: req.body.handicap
	});
	user.saveAsync().then(function(){
		console.log("returning inside of save");
		req.session.email = user.email;
		res.redirect(303, '/users/' + user.id);
	}).catch(function(err){
		console.log("error : " + err);
		res.redirect(303, '/users/new');
	});
});

usersController.get('/login', function (req, res){
	res.render('users/login.ejs');
});

usersController.post('/login', function (req, res){
	User.findOneAsync({
		email: req.body.email
	}).then(function(user){
		user.comparePasswordAsync(req.body.password).then(function (isMatch){
			console.log("Match: " + isMatch);
			req.session.email = user.email;
			res.redirect(303, 'users/' + user.id);
		});
	});
});

usersController.get('/logout', function (req, res){
	req.session.email = null;
	res.redirect(303, '/');
});

module.exports = usersController;
