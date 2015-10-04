var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var userSchema = mongoose.Schema({
	email: String,
	password: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;