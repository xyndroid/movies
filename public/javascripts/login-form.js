$( document ).ready(function() {
  "user strict";
  var username;
  var pswd;
  var data;

  $('#login-form').submit(function(){
    username = $('input:text[name=lg_username]').val();
    pswd = $('input:text[name=password]').val();
  });
});
