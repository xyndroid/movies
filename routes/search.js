var express = require('express');
var pool = require('../dbconnection');
var router = express.Router();
var search_for;

/* GET movies listing. */
router.get('/', function(req, res, next) {
  search_for = req.query.search;
  query = 'select m.id, m.title, m.description, m.rdate, m.language, m.duration, m.cover, avg(r.star) as star \
            from movie as m, rate_movie as rm, rating as r \
            where m.id = rm.movie_id and rm.rating_id = r.id and m.title like "%'+search_for+'%" \
            group by rm.movie_id';
  pool.query(query, function(error, result){
    console.log('querying movies');
    console.log(query);
    if(error){
      console.log('Error in extracting movies in query');
    }else{
      if(result != ''){
        if(typeof result != 'undefined'){
          console.log('movies were extracted');
          console.log(result.length + ' movies were selected');
          movies = result;
          console.log('movies variable contains ' + movies);
          res.render('movies', {movies: movies, 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
        }else{
          console.log('There was error in movies.js file with query returned undefined');
          res.render('movies', {movies: '', 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
        }
      }else{
        console.log('result from movies table is empty');
        res.render('movies', {movies: '', 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
      }
    }
  });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
  res.render('movies', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Movies page'});
});

module.exports = router;
