var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact . */
router.get('/', function(req, res, next) {
  res.render('register', {title: 'Registration page'});
});

/* GET contact . */
router.post('/', function(req, res, next) {
  res.render('register', {title: 'Registration page'});
});

module.exports = router;
