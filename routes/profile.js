var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  res.render('profile', {'fullname': req.session.fullname, 'status': req.session.status, title: 'Profile page'});
});

/* GET movies listing. */
router.post('/', function(req, res, next) {
  res.render('profile', {'fullname': req.session.fullname, 'status': req.session.status, title: 'Profile page'});
});

module.exports = router;
