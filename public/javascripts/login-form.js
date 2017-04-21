$( document ).ready(function() {
  "user strict";
  var username;
  var pswd;
  var data;

  $('#login-form').submit(function(){
    username = $('input:text[name=lg_username]').val();
    pswd = $('input:text[name=password]').val();
  });

  $(".nav li").removeClass("active");//this will remove the active class from
                                     //previously active menu item
  $('#home').addClass('active');
  //for demo
  $('#movies').addClass('active');
  //for sale
  //$('#sale').addClass('active');

});
