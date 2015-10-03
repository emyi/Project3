var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = mongoose.Schema({
	name: String,
	address: String,
	price: Number
});

var Course = mongoose.model('Course', courseSchema);
module.exports = Course;