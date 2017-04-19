var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact . */
router.get('/register', function(req, res, next) {
  res.send('Register Page');
});

module.exports = router;
