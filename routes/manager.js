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
        if(typeof result != 'undefined'){
          console.log('movies were extracted');
          console.log(result.length + ' movies were selected');
          //console.log(result);
          console.log(result[0].id);
          res.render('manager', {movies:result, 'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager\'s page'});
        }else{
          console.log('result from movies table is empty');
          res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager\'s page'});
        }
      }else{
        console.log('result from movies table is empty');
        res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager\'s page'});
      }
    }
  });
});
//
// router.post('/', function(req, res, next) {
//   res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Manager\'s page POST'});
// });
//
// router.get('/delete', function(){
//   res.render('manager', {'fullname': req.session.fullname, 'status': req.session.status, 'manager' : req.session.manager, title: 'Delete page'});
// });

module.exports = router;
