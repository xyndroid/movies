var express = require('express');
var router = express.Router();
var pool = require('../dbconnection');
var nodemailer = require('nodemailer');

/* GET contact . */
router.get('/', function(req, res, next) {
  console.log(req.body);
  console.log('type');
  res.render('register');
});

/* POST contact . */
router.post('/', function(req, res, next) {
    console.log(req.body);
  //res.render('register', {title: 'This is title for POST method.'});


  query = 'SELECT * FROM user WHERE username = "'+req.body['reg_username']+'" LIMIT 1';

  console.log(query);

  pool.query(query, function(error, result){
    if(!error){
      console.log(result);
    //  if (error) console.log('not connected to database');
    //  else console.log ('it is connected');

      if (result == '' || typeof result == 'undefined'){
        query2 = 'INSERT INTO user (fname,lname,gender,type, username, password) VALUES ("' + req.body['reg_firstname'] + '","' + req.body['reg_lastname'] + '", "' + req.body.reg_gender + '",'+req.body.reg_type+', "' + req.body['reg_username'] + '","' + req.body['reg_password']+'")';
      //  query2 = 'INSERT INTO user (fname,lname,type, email, password) VALUES ("' + req.body['reg_firstname'] + '","' + req.body['reg_lastname'] + '",1, "' + req.body['reg_username'] + '","' + req.body['reg_password']+'")';
        console.log(query2);

     pool.query(query2, function(error, result2){
       console.log(result2);
     });

        res.render('login', {title: req.body['reg_username']});

      }else{
        console.log('Error in registering\n');
        res.render('register', {
          title: 'Error: Username exists.'
      //    message: 'Hello'
        });

        res.render('register', {title: 'Error in Registering.'});
      }
    }else{
      console.log('Error in checking of existing user.');
      res.render('register', {title: 'Error in Registering.'});
    }
  });
});

module.exports = router;
