var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  res.render('watchlist', {'fullname': req.session.fullname, 'status': req.session.status, title: 'Watchlist page'});
});

router.post('/', function(req, res, next) {
  res.render('watchlist', {'fullname': req.session.fullname, 'status': req.session.status, title: 'Watchlist page'});
});

module.exports = router;
