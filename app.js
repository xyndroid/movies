// 1
var express = require('express');
var mysql = require('mysql');
var fs = require('fs');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');
var profile = require('./routes/profile');
var login = require('./routes/login');
var movies = require('./routes/movies');
var contact = require('./routes/contact');
var register = require('./routes/register');
var reset = require('./routes/reset');

// 2
var app = express();

var host;
var user;
var pswd;
var db;

var databaseConfig = fs.readFileSync('/Users/Natsagaa/Documents/UK/CS405/project/config', 'utf8');

databaseConfig = databaseConfig.split('\n');

var connection = mysql.createConnection({
  host: databaseConfig[0],
  user: databaseConfig[1],
  password: databaseConfig[2],
  database: databaseConfig[3]
});

connection.connect(function(err){
  if(err){
    console.log('Database is not connected!');
    throw err;
  }else{
    console.log('Connected');
  }
});

var query = connection.query('SELECT * FROM user', function(error, result){
  if (error)
    console.log('Error in selecting users\n');
  else {
      console.log('user\'s last name is ' + result[1].fname);
  }
});

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

app.use('/', index);
app.use('/user', user);
app.use('/movies', movies);
app.use('/login', login);
app.use('/profile', profile);
app.use('/contact', contact);
app.use('/register', register);
app.use('/reset', reset);

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

module.exports = app;
