var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Post Movies by C.A.' });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  res.render('index', { 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Post Movies by C.A.' });
});

module.exports = router;
