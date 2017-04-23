var express = require('express');
var bodyParser = require('body-parser');
var pool = require('../dbconnection');
var moment = require('moment');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  movie_id = req.query.movie_id;
  console.log('movie id to be edited ' + movie_id);
  query = 'SELECT * FROM movie WHERE id = '+movie_id+' LIMIT 1';

  console.log(query);

  pool.query(query, function(error, result){
    if(error){
      console.log('Error in extracting movies in query');
    }else{
      if(result != ''){
        if(typeof result != 'undefined'){
          console.log(result.length + ' movies were selected');
          res.render('edit', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, movie:result});
        }else{
          res.render('edit', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager});
        }
      }else{
        console.log('result from movies table is empty');
        res.render('edit', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager});
      }
    }
  });
});

router.post('/', function(req, res, next){
  movie_id = req.body['movie_id'];
  console.log('movie id to be edited ' + movie_id);

  query = 'UPDATE movie SET title="'+req.body['title']+'", description="'+req.body['description']+'", rdate="'+moment(req.body['rdate']).format("YYYY-MM-DD")+'", language="'+req.body['language']+'", duration='+req.body['duration']+', cover="'+req.body['cover']+'" WHERE id = '+movie_id+' LIMIT 1';

  console.log(query);

  pool.query(query, function(error, result){
    if(error){
      console.log('Error in extracting movies in query');
    }else{
      if(result != ''){
        console.log('movie info is updated');
        res.redirect('movies');
      }else{
        console.log('result from movies table is empty');
        res.redirect('movies');
      }
    }
  });

});

module.exports = router;
