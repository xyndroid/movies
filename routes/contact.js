var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact . */
router.get('/', function(req, res, next) {
  res.render('contact', {title: 'Welcome to contact page'});
});

/* POST contact */
router.post('/send', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;
