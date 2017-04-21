var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact . */
router.get('/', function(req, res, next) {
  res.render('reset', {title: 'Reset page'});
});

router.post('/', function(req, res, next) {
  res.render('reset', {title: 'Reset page'});
});

module.exports = router;
