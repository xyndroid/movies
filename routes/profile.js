var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/profile', function(req, res, next) {
  res.send('Profile Page');
});

module.exports = router;
