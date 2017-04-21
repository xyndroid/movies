var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact . */
router.get('/', function(req, res, next) {
  res.render('contact', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Contact page'});
});

/* POST contact */
router.post('/send', function(req, res, next) {
  res.render('contact', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Contact page'});
});

module.exports = router;
