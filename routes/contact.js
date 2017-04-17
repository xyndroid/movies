var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact . */
router.get('/contact', function(req, res, next) {
  res.send('Contact Page');
});

/* POST contact */
router.post('/send', function(req, res, next) {
  var transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'natsagaa@gmail.com',
      pass: 'somepass'
    }
  });

  var mailOptions = {
    to: 'andy.b@uky.edu',
    subject: 'Contact from Movies by C.A.',
    text: 'You have new message from:' + req.body.first_name + '@moviesbyca.com' + '\nEmail: ' + req.body.email + '\nMessage:' + req.body.comment
  };

  transport.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('Email couldn\'t be sent');
      req.redirect('/');
    }else{
      console.log('Message sent successfully' + info.response);
      req.redirect('/');
    }
  });
});

module.exports = router;
