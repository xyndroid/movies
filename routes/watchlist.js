var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  res.render('watchlist', {title: 'Watchlist page'});
});

router.post('/', function(req, res, next) {
  res.render('watchlist', {title: 'Watchlist page'});
});

module.exports = router;
