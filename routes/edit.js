var express = require('express');
var bodyParser = require('body-parser');
var pool = require('../dbconnection');
var moment = require('moment');
var router = express.Router();
var movie_id;

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
  res.render('edit', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title : title, test: 'test phrase', description:description, cover: cover, rdate:rdate, language: language, star: star, duration: duration, movie_id:movie_id});
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
        res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager Page'});
      }else{
        console.log('result from movies table is empty');
        res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager Page'});
      }
    }
  });

});

module.exports = router;
