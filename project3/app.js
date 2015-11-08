require('dotenv').load();

module.exports = require('./node_modules/express/lib/express');
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./db/config.js');
var credentials = require('./config/credentials.js');
// var oauthSignature = require('oauth-Signature');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use( require('./node_modules/body-parser').urlencoded({ extended: true }));
app.use( require('cookie-parser')(credentials.cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));
app.use( require('express-session')({ resave: false, saveUninitialized: false, secret: credentials.cookieSecret}));


app.use(require('./routes'));


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/YOUR_LOCAL_DATABASE_NAME' // plug in the db name you've been using
);

require('./db/seeds.js').seedUsers();

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
