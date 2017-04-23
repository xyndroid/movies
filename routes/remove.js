var express = require('express');
var pool = require('../dbconnection');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('calling remove page');
  var movie_id = req.query.movie_id;
  console.log(movie_id);
  remove_query = 'UPDATE movie SET status = 0 WHERE id = '+movie_id+' LIMIT 1';
  console.log(remove_query);
  pool.query(remove_query, function (error, update) {
    if(!error){
      if(update != '' && typeof update != 'undefined'){
        res.redirect('manager');
      }else{

      }
    }else{
      console.log('error in removing movie');
      res.render('manager', { 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Post Movies by C.A.' });
    }
  });
});

module.exports = router;
