var express = require('express');
var router = express.Router();

/* GET movies listing. */
router.get('/movies', function(req, res, next) {
  res.send('Movies Page');
});

module.exports = router;
