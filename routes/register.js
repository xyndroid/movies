var express = require('express');
var router = express.Router();
var pool = require('../dbconnection');
var nodemailer = require('nodemailer');

/* GET contact . */
router.get('/', function(req, res, next) {
  console.log(req.body);
  console.log('type');
  res.render('register', {title: 'This is title for GET method.'});
  res.render('register', {title: 'Registration page'});
});

/* GET contact . */
router.post('/', function(req, res, next) {
    console.log(req.body);

  query = 'SELECT * FROM user WHERE email = "'+req.body['lg_username']+
          '" and password = "'+req.body['lg_password']+'" LIMIT 1';


  res.render('register', {title: 'Registration page'});
});

module.exports = router;
