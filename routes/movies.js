var express = require('express');
var pool = require('../dbconnection');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  query = ' select m.id, m.title, m.description, m.rdate, m.language, m.duration, m.cover, avg(r.star) as star\
            from movie as m, rate_movie as rm, rating as r \
            where m.id = rm.movie_id and rm.rating_id = r.id \
            group by rm.movie_id';
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
  res.render('movies', {movies: movies, 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Movies page'});
});

router.post('/', function(req, res, next) {
  res.render('movies', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Movies page'});
});

module.exports = router;
