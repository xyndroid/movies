var express = require('express');
var pool = require('../dbconnection');
var router = express.Router();

router.get('/:mid', function(req, res, next) {
  var movie_info;
  var movie_id;
  //var title;
  var description;
  var cover;
  var rdate;
  var language;
  var star;
  var duration;

  movie_id = req.query.mid;
  query = 'select m.id as id, m.title as title, m.description as description, m.rdate as rdate, m.language as language, m.duration as duration, m.cover as cover, avg(r.star) as star from movie as m, rate_movie as rm, rating as r where m.id = rm.movie_id and rm.rating_id = r.id and m.id='+movie_id+' group by rm.movie_id LIMIT 1';
  pool.query(query, function(error, result){
    if(error){
      console.log('Error in extracting movies in query');
    }else{
      if(result != ''){
        console.log(result.length + ' movies were selected');
        console.log('result file contains' + result);
        movie_info = result;
        // title = result[0].title;
        // description = result[0].description;
        // cover = result[0].cover;
        // rdate = result[0].rdate;
        // language = result[0].language;
        // star = result[0].star;
        // duration = result[0].duration;
        console.log('movie info ' + cover + ' language ' + movie_info['language']);
      }else{
        console.log('result from movies table is empty');
      }
    }
  });
  res.render('movie', { 'title' : title, 'test' : 'test phrase', 'movie' : movie_info}); //description:description, cover: cover, rdate:rdate, language: language, star: star, duration: duration});
});




/* GET movies listing. */
router.get('/', function(req, res, next) {
  var movie_info;
  var movie_id;
  //var title;
  var description;
  var cover;
  var rdate;
  var language;
  var star;
  var duration;

  movie_id = req.query.mid;
  query = 'select m.id as id, m.title as title, m.description as description, m.rdate as rdate, m.language as language, m.duration as duration, m.cover as cover, avg(r.star) as star from movie as m, rate_movie as rm, rating as r where m.id = rm.movie_id and rm.rating_id = r.id and m.id='+movie_id+' group by rm.movie_id LIMIT 1';
  pool.query(query, function(error, result){
    if(error){
      console.log('Error in extracting movies in query');
    }else{
      if(result != ''){
        console.log('result file contains' + result);
        console.log(result.length + ' movies were selected');
        movie_info = result;
        title = result[0].title;
        description = result[0].description;
        cover = result[0].cover;
        rdate = result[0].rdate;
        language = result[0].language;
        star = result[0].star;
        duration = result[0].duration;
        console.log('movie info ' + cover);
      }else{
        console.log('result from movies table is empty');
      }
    }
  });
  res.render('movie', {title : title, description:description, cover: cover, rdate:rdate, language: language, star: star, duration: duration});
});

router.post('/', function(req, res, next) {
  console.log('req.params.id is ' + req.query.mid);
  movie_id = req.query.mid;
  res.render('movie', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Movies page'});
});

module.exports = router;
