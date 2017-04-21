var express = require('express');
var pool = require('../dbconnection');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  query = ' select * from movie';
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
        res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'manager page', movie:movies});
      }else{
        console.log('result from movies table is empty');
      }
    }
  });

});

router.post('/', function(req, res, next) {
  res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager page'});
});

router.get('/delete', function(){
  res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Delete page'});
});

module.exports = router;
