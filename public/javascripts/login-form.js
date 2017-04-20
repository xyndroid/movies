$( document ).ready(function() {
  "user strict";
  var username;
  var pswd;
  var data;
  $('#login-form').submit(function(){
    username = $('input:text[name=lg_username]').val();
    alert(username);
    pswd = $('input:text[name=password]').val();
    alert(username);
    data = {'username'=>username, 'pswd'=>pswd};
    $.post('/verify', $(this).serialize(), function(data){
      console.log(data);
    });
  });
});
