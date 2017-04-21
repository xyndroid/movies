var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('profile', {title: 'Profile page'});
});

/* GET movies listing. */
router.post('/', function(req, res, next) {
  res.render('profile', {title: 'Profile page'});
});

module.exports = router;
