var express = require('express');
var router = express.Router();

/* GET contact . */
router.get('/', function(req, res, next) {
  res.render('error', {title: 'Error page', message: 'Error in viewing'});
});

router.post('/', function(req, res, next) {
  res.render('error', {title: 'Error page', message: 'Error in viewing'});
});

module.exports = router;
