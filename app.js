var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('./models/users');

var routes = require('./routes/index');
var users = require('./routes/users');

var register = require('./routes/register');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60000, secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new localStrategy(
    function(username, password, done) {
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
    if(err) done(err);
    done(null,user);
  });
});

passport.use('local', new localStrategy({
      passReqToCallback : true,
      usernameField: 'username'
    },
    function(req, username, password, done){
      User.findOne({ username: username }, function(err, user) {
        if (err) throw err;
        if (!user)
          return done(null, false, {message: 'Incorrect username and password.'});

        // test a matching password
        user.comparePassword(password, function(err, isMatch) {
          if (err) throw err;
          if(isMatch)
            return done(null, user);
          else
            done(null, false, { message: 'Incorrect username and password.' });
        });
      });
    }));

app.use('/', routes);
app.use('/users', users);
app.use('/register', register);


// Mongo setup
var mongoURI = "mongodb://localhost:27017/prime_solo_db_01";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
  console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
