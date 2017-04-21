var express = require('express');
var bodyParser = require('body-parser');
var pool = require('../dbconnection');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  console.log(req.body);
  console.log('type');
  res.render('login', {title: 'This is title for GET method.'});
});

router.post('/', function(req, res, next){
  console.log(req.body);

  query = 'SELECT * FROM user WHERE email = "'+req.body['lg_username']+'" and password = "'+req.body['lg_password']+'" LIMIT 1';

  console.log(query);

  pool.query(query, function(error, result){
    console.log('Result of query:'+result);
    if(error){
      console.log('error in connection');
    }
    if (result == ''){
      console.log('Error in selecting users\n');
      //console.log(res);
      res.render('index', {
        title: 'Error in login.'

      });
    }else{
      console.log('user\'s last name is ' + result[0].fname);

      req.session.fullname = result[0].fname + ' ' + result[0].lname;
      req.session.status = true;

      console.log(req.session);
      res.render('index', {
        'fullname': req.session.fullname,
        title: 'Welcome ' + result[0].lname,
        authentication: true
      });
    }
  });

});

module.exports = router;
