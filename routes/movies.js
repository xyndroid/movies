var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  res.render('movies', {title: 'Movies page'});
});

router.post('/', function(req, res, next) {
  res.render('movies', {title: 'Movies page'});
});

module.exports = router;
