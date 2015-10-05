var express = require('express');
var router = express.Router();
// var User = require('../models/user.js');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

exports.index = function (req, res){
	User.find({}).exec(function (err, users) {
        res.render('index.ejs', {
            users: users
        });
    });
};

router.use('/', require('./users'));

router.use('/', require('./courses'));


module.exports = router;
