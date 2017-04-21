var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  if(req.session.fullname == '' || req.session.status == false || req.session.manager == false){
    res.render('index', {title: 'Welcome ' + req.session.fullname});
  }else{
    res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager\' page'});
  }

});

router.post('/', function(req, res, next) {
  res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager\'s page'});
});

module.exports = router;
