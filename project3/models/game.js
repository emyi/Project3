var mongoose = require('mongoose');
var Schema = mongoose.Scehma;

var gameSchema = mongoose.Schema({
	course_id: {type: Schema.Types.ObjectId, ref: 'Course'},
	user_ids: {type: Schema.Types.ObjectId, ref: 'User'}
});

var Game = mongoose.model('Game', gameSchema);
module.exports = Game;