var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact . */
router.get('/reset', function(req, res, next) {
  res.send('Reset password Page');
});

module.exports = router;
