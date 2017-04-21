var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Get Movies by C.A.' });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Post Movies by C.A.' });
});

module.exports = router;
