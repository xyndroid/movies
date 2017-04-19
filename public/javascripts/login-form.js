$( document ).ready(function() {
  "user strict";
  var username;
  var pswd;

  $('#login-form').submit(function(){
    username = $('input:text[name=lg_username]').val();
    alert(username);
    pswd = $('input:text[name=password]').val();
    alert(username);
    $.ajax();
  });
});
