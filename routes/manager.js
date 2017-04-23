var express = require('express');
var pool = require('../dbconnection');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  query = 'select m.id, m.title, m.description, m.rdate, m.language, m.duration, m.cover, avg(r.star) as star \
            from movie as m, rate_movie as rm, rating as r \
            where m.id = rm.movie_id and rm.rating_id = r.id and m.status = 1 \
            group by rm.movie_id';
  pool.query(query, function(error, movies){
    console.log('querying movies');
    console.log(query);
    if(error){
      console.log('Error in extracting movies in query');
    }else{
      if(movies != ''){
        if(typeof movies != 'undefined'){
          console.log('movies were extracted');
          console.log(movies.length + ' movies were selected');
          //console.log(movies);
          console.log(movies[0].id);
          var ids = '';
          var movie_ids = movies.map(function(key, value){
            if(ids == ''){
              ids = ids + key['id'];
            }else{
              ids = ids + ', ' + key['id'];
            }
            return ids;
          });
          tag_query = 'select mt.movie_id, t.tag from movie_tags as mt join tag as t on mt.tag_id = t.id where mt.movie_id in ('+movie_ids+') order by mt.movie_id';
          pool.query(tag_query, function (error, tags) {
              if(!error && tags !='' && typeof tags != 'undefined'){
                console.log(movies);
                console.log(tags);
                console.log(movies[0].title);
                console.log('rendering movies page from manager');
                res.render('movies', { movies:movies, tags:tags, 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
              }else{
                console.log('error in tag query');
                res.render('index', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
              }
          });
        }else{
          console.log('index from movies table is empty');
          res.render('index', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager\'s page'});
        }
      }else{
        console.log('movies from movies table is empty');
        res.render('index', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager\'s page'});
      }
    }
  });
});
//
// router.post('/', function(req, res, next) {
//   res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager\'s page POST'});
// });
//
router.get('/:mid', function(res, req, next){
  console.log('movie is ' + req.params.mid);
  console.log('attempting to delete movie');
  this.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Delete page'});
});

module.exports = router;
