var express = require('express');
var usersController = express.Router();
var User = require('../models/user.js');
var Game = require('../models/game.js');


// usersController.get('/user', function ( req, res ) {
//     User.findAsync({}).then(function (users, err){
//         if(req.session && req.session.email){
//             User.findOne({ email: req.session.email}).then(function(user, err){
//                 console.log(users.length)
//                 res.render('index.ejs',{
//                     user: user,
//                     curr_user: user.email
//                 });
//             })
//         }
//         else{
//             res.render('index.ejs',{
//                 curr_user: null,
//                 user: user
//             });
//         }
//     });
// });

//gets list of all users
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

//gets the users profile
usersController.get('/users/:id', function (req, res){
	User.findByIdAsync(req.params.id).then(function(user){
		res.render('users/profile.ejs', {
			curr_user: user
		});
	}).catch();
});

//gets the users edit page
usersController.get('/users/:id/edit', function (req, res){
	User.findByIdAsync(req.params.id).then(function(user){
		res.render('users/edit.ejs', {
			curr_user: user
		});
	}).catch();
});

//gets the register page
usersController.get('/new', function (req, res){
	res.render('users/new.ejs');
});

//update user info here
usersController.post('/users/:id/update', function (req, res) {
  	var id = req.params.id;
	  	User.findById(id, function(error, user) {
		    if(req.body.location) user.location = req.body.location;
		    if(req.body.handicap) user.handicap = req.body.handicap;
		    user.save(function(error) {
	      		if(error) res.json({messsage: 'Could not update user b/c:' + error});
	    		res.redirect(303, '/users/' + user.id);  
	    	});
	  	});
});

//creates new user here
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

//gets login page here
// usersController.get('/login', function (req, res){
// 	res.render('users/login.ejs');
// });

//creates a login session here
usersController.post('/login', function (req, res){
	//takes the email user inputs here
	User.findOneAsync({
		email: req.body.email
	}).then(function(user){
		//compares the password with the password that user inputs when trying to log in
		user.comparePasswordAsync(req.body.password).then(function (isMatch){
			console.log("Match: " + isMatch);
			if(isMatch === true){
				//if password matches, creates session
				req.session.email = user.email;
				res.redirect(303, 'users/' + user.id);
			}else{
				//redirects them if password doesn't match
				res.redirect(401, '/login');
			}

		});
	});
});


//creates a login session here
usersController.post('/login_redirect/:id', function (req, res){
	//takes the email user inputs here
	User.findOneAsync({
		email: req.body.email
	}).then(function(user){
		//compares the password with the password that user inputs when trying to log in
		user.comparePasswordAsync(req.body.password).then(function (isMatch){
			console.log("Match: " + isMatch);
			if(isMatch === true){
				//if password matches, creates session
				req.session.email = user.email;
				res.redirect(303, '/courses/' + req.params.id);
			}else{
				//redirects them if password doesn't match
				res.redirect(401, '/courses/' + req.params.id);
			}

		});
	});
});


//method to view other player pages
// usersController.get('/player/:id', function (req, res) {
// 	User.findByIdAsync(req.params.id).then(function (user) {
// 		res.render('users/show', {
// 			user: user
// 		});
// 	}).catch();
// });

//destroys a login session here
usersController.get('/logout', function (req, res){
	req.session.email = null;
	res.redirect(303, '/');
});

module.exports = usersController;
