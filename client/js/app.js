// DOM ready
$(document).ready(function() {

  // start application, when user has signed in with facebook
  facebook.on('logged-in', function() {

    // Instantiate the router
    var app_router = new AppRouter();

    // Start Backbone history a neccesary step for bookmarkable URL's
    Backbone.history.start();

  });
});

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// login button
$('#login-button').live('click', function() {
  FB.login(function(response) {}, {
    scope: 'email'
  });
});