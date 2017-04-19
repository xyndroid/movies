var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Movies by C.A.' });
});

/* GET user page. */
router.get('/user', function(req, res, next) {
  res.render('user', { title: 'User' });
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET movies page. */
router.get('/movies', function(req, res, next) {
  res.render('movies', { title: 'Movies' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* GET contact page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});

/* GET contact page. */
router.get('/reset', function(req, res, next) {
  res.render('reset', { title: 'Reset password' });
});
module.exports = router;
