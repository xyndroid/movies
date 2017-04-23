var express = require('express');
var pool = require('../dbconnection');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log('movie infor with :mid');
  movie_id = req.query.mid;
  console.log('movie id is: ' + movie_id);
  movie_query = 'select m.id as id, m.title as title, m.description as description, m.rdate as rdate, m.language as language, m.duration as duration, m.cover as cover, avg(r.star) as star from movie as m, rate_movie as rm, rating as r where m.id = rm.movie_id and rm.rating_id = r.id and m.id='+movie_id+' group by rm.movie_id LIMIT 1';
  console.log(movie_query);
  pool.query(movie_query, function(error, movie){
    if(error){
      console.log('Error in extracting movies in query');
    }else{
      if(movie != '' && typeof movie != 'undefined'){
        tag_query = 'select mt.movie_id, t.tag from movie_tags as mt join tag as t on mt.tag_id = t.id where mt.movie_id in ('+movie_id+') order by mt.movie_id';
        pool.query(tag_query, function (error, tags) {
            if(!error && tags !='' && typeof tags != 'undefined'){
              console.log(movie);
              console.log(tags);
              res.render('movie', { movie:movie, tags:tags, 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
            }else{
              console.log('error in tag query');
              res.render('movie', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
            }
        });
      }else{
        console.log('result from movies table is empty');
        res.render('movie', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Movie page'});
      }
    }
  });
});

router.post('/', function(req, res, next) {
  console.log('req.params.id is ' + req.query.mid);
  movie_id = req.query.mid;
  res.render('movie', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Movies page'});
});

router.post('/review', function(req, res, next) {
  query = 'INSERT INTO rating (comment, star) VALUES ("'+req.body['review_comment']+'", '+req.body['review_star']+')';
  pool.query(query, function(error, result){
    if(!error && result != '' && typeof result != 'undefined'){
      console.log(result);
      //query = 'INSERT INTO rate_movie ('+req.session.userID+', '+req.body['movie_id']+', '++') VALUES ()';
      res.render('movie', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Movies page'});
    }else{
      res.render('movie', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Movies page'});
    }

  });
});

module.exports = router;
