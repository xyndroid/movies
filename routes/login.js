var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/login', function(req, res, next) {
  res.send('Login Page');
});

router.post('/verify', function(req, res, next){
  console.log(res);
});

module.exports = router;
