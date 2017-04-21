var express = require('express');
var pool = require('../dbconnection');
var router = express.Router();
var movies;
var movie_title;
var movie_description;
var movie_release_date;
var movie_language;
var movie_duration;

/* GET movies listing. */
router.get('/', function(req, res, next) {
  query = 'SELECT * FROM movie, rate_movie, rating WHERE movie.id = rate_movie.movie_id AND rate_movie.rating_id=rating.id';
  pool.query(query, function(error, result){
    console.log('querying movies');
    console.log(query);
    if(error){
      console.log('Error in extracting movies in query');
    }else{
      if(result != ''){
        console.log('movies were extracted');
        console.log(result.length + ' movies were selected');
        movies = result;
      }else{
        console.log('result from movies table is empty');
      }
    }
  });
  res.render('movies', {'movies': movies, 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Movies page'});
});

router.post('/', function(req, res, next) {
  res.render('movies', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Movies page'});
});

module.exports = router;
