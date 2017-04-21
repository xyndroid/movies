var express = require('express');
var router = express.Router();

/* POST home page. */
router.get('/', function(req, res, next) {
  console.log('session destroy function');
  req.session.destroy(function(err) {
    if(err) {
      console.log('Error in destroying session');
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
});

module.exports = router;
