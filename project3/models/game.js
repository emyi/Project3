var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = mongoose.Schema({
	course_id: String, //make this a string
	user_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	teetime: Date
});

var Game = mongoose.model('Game', gameSchema);
module.exports = Game;