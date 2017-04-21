var express = require('express');
var pool = require('../dbconnection');
var router = express.Router();


/* GET addmovie . */
router.get('/', function(req, res, next) {
  console.log(req.body);
  console.log('type');
  res.render('addmovies');
});

router.post('/', function(req, res, next) {
    console.log(req.body);
  query = 'SELECT * FROM movie WHERE title = "'+req.body['new_title']+'" LIMIT 1';
  console.log(query);
  pool.query(query, function(error, result){
    console.log(result);

    if (result == ''){
          console.log('result is empty');
          query2 = 'INSERT INTO movie (title,description,language,duration) VALUES ("' + req.body['new_title'] + '","' + req.body['new_description'] + '", "' + req.body['new_lang'] + '","' + req.body['new_duration']+'")';
          console.log(query2);

       pool.query(query2, function(error, result2){
         console.log(result2);
       });

  }else{
   console.log('Error in registering\n');
   res.render('addmovies', {
     title: 'Error: Movie exists.'
 //    message: 'Hello'
   });
 }

  res.render('addmovies');
     });
});

module.exports = router;
