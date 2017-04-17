var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/login', function(req, res, next) {
  res.send('Login Page');
});

module.exports = router;
