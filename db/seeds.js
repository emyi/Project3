var User = require('../models/user.js');

exports.seedUsers = function seedUsers() {
	User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            User.create({ email: 'test@test.com', hashed_password: 'sfsd0745sf34fewf43frf' });
            User.create({ email: 'test2@test.com', hashed_password: 'jokhjp8hlk7t7glkeqr23'});
        }
    });
};