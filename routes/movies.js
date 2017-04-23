var express = require('express');
var pool = require('../dbconnection');
var router = express.Router();

/* GET list movies. */
router.get('/', function(req, res, next) {
  rating_query = 'select m.id, m.title, m.description, m.rdate, m.language, m.duration, m.cover, avg(r.star) as star \
            from movie as m, rate_movie as rm, rating as r \
            where m.id = rm.movie_id and rm.rating_id = r.id and m.status = 1\
            group by rm.movie_id';

  pool.query(rating_query, function(error, movies){
    if(error){
      console.log('Error in extracting movies in query');
    }else{
      if(movies != '' && typeof movies != 'undefined'){
        console.log(rating_query);
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
              console.log(movies)
              console.log(tags);

                crew_query = 'select distinct mc.movie_id, c.role, mc.name from movie_crew as mc join crew as c on mc.crew_id = c.id where mc.movie_id in ('+movie_ids+') order by mc.movie_id';
                console.log(crew_query);
                pool.query(crew_query, function(error, crews){
                  if(!error){
                    if(crews != '' && typeof crews != 'undefined'){
                        genre_query = 'select distinct mg.movie_id, g.genre from movie_genre as mg join genre as g on mg.genre_id = g.id where mg.movie_id in ('+movie_ids+')';
                        console.log(genre_query);
                        pool.query(genre_query, function(error, genres){
                          if(!error){
                            if(genres != '' && typeof genres != 'undefined'){
                              res.render('movies', { movies:movies, tags:tags, crews:crews, genres:genres, 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
                            }else{
                              console.log('query is empty');
                              res.redirect('movies');
                            }
                          }else{
                            console.log('error in querying genre');
                            res.redirect('movies');
                          }
                        });
                    }else{
                      console.log(crews);
                      console.log('crew query returned empty information');
                      res.redirect('movies');
                    }
                  }else{
                    console.log('error in query crew members');
                    res.redirect('movies');
                  }
                });
            }else{
              console.log('error in tag query');
              res.render('movies', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
            }
        });
      }else{
        console.log('result from movies table is empty');
        res.render('movies', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
      }
    }
  });
});

/* GET movies by tag. */
router.get('/:tag', function(req, res, next) {
  console.log('search movie by tag');
  movie_tag = req.params.tag;
  console.log('search movies by ' + movie_tag);
  rating_query = 'select m.id, m.title, m.description, m.rdate, m.language, m.duration, m.cover, avg(r.star) as star \
            from movie as m, rate_movie as rm, rating as r \
            where m.id = rm.movie_id and rm.rating_id = r.id \
            group by rm.movie_id';

  crew_query = 'select mc.movie_id, c.role, mc.name from movie_crew as mc join crew as c on mc.crew_id = c.id where mc.movie_id = 8;';
  genre_query = 'select mg.movie_id, g.genre from movie_genre as mg join genre as g on mg.genre_id = g.id where mg.movie_id = 1';

  // search movies by tag
  tag_query = 'select mt.movie_id, t.tag from movie_tags as mt join tag as t on mt.tag_id = t.id where t.tag = "'+movie_tag+'" order by mt.movie_id';
  console.log(tag_query);
  pool.query(tag_query, function (error, tags) {
      if(!error && tags !='' && typeof tags != 'undefined'){
        console.log(tags);
        var ids = '';
        var movie_ids = tags.map(function(key, value){
          if(ids == ''){
            ids = ids + key['movie_id'];
          }else{
            ids = ids + ', ' + key['movie_id'];
          }
          return ids;
        });
        console.log(movie_ids);
        rating_query = 'select m.id, m.title, m.description, m.rdate, m.language, m.duration, m.cover, avg(r.star) as star \
                  from movie as m, rate_movie as rm, rating as r \
                  where m.id = rm.movie_id and rm.rating_id = r.id and m.id in ('+movie_ids+') \
                  group by rm.movie_id';
        console.log(rating_query);
        // extract movies with requested tag
        pool.query(rating_query, function(error, movies){
          if(!error){
            if(movies != '' && typeof movies != 'undefined'){
              console.log('movies by tags');
              console.log(movies);
              //res.redirect('movies')
              res.render('movies', {movies: movies, tags:tags, 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
            }else{
              console.log('the query was successful but its empty.');
              res.render('movies', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
            }
          }else{
            console.log('Error ing query movies when trying to get movies by tag');
            res.render('movies', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
          }
        });
      }else{
        console.log('error in tag query');
        res.render('movies', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Welcome to Movies page'});
      }
  });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
  res.render('movies', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Movies page'});
});
module.exports = router;
