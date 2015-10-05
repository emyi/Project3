var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var userSchema = mongoose.Schema({
	email: String,
	password: String,
	name: String,
	location: String,
	handicap: Number
});

var User = mongoose.model('User', userSchema);
module.exports = User;