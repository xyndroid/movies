var express = require('express');
var router = express.Router();

/* POST home page. */
router.get('/', function(req, res, next) {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.render('index');
    }
  })
});

module.exports = router;
