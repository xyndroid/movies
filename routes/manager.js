var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, title: 'Manager\' page'});
});

router.post('/', function(req, res, next) {
  res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, title: 'Manager\'s page'});
});

module.exports = router;
