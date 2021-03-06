// 1
var express = require('express');
var mysql = require('mysql');
var fs = require('fs');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var profile = require('./routes/profile');
var login = require('./routes/login');
var logout = require('./routes/logout');
var movie = require('./routes/movie');
var movies = require('./routes/movies');
var edit = require('./routes/edit');
var addmovies = require('./routes/addmovies');
var contact = require('./routes/contact');
var register = require('./routes/register');
var reset = require('./routes/reset');
var watchlist = require('./routes/watchlist');
var manager = require('./routes/manager');
var search = require('./routes/search');
var remove = require('./routes/remove');

// 2
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }}));

app.use('/', index);
app.use('/movie', movie);
app.use('/movies', movies);
app.use('/edit', edit);
app.use('/addmovies', addmovies);
app.use('/login', login);
app.use('/logout', logout);
app.use('/profile', profile);
app.use('/contact', contact);
app.use('/register', register);
app.use('/reset', reset);
app.use('/watchlist', watchlist);
app.use('/manager', manager);
app.use('/search', search);
app.use('/remove', remove);

app.use(function(req, res, next){
  req.session.manager = false;
  res.session.status = false;
  res.session.fullname = '';
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.moment = require('moment');

module.exports = app;
