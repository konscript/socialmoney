// DOM ready
(function($){
    // Instantiate the router
    var app_router = new AppRouter();

    // Start Backbone history a neccesary step for bookmarkable URL's
    Backbone.history.start();
}(jQuery));

// login button
$('#login-button').live('click', function(){
    FB.login(function(response) {}, {scope: 'email'});
});

// user logged in
var onLoginStatusChange = function(auth){
    console.log("Logging in...");

    if (auth.authResponse) {
        FB.api('/me', function(user) {

            $.ajax({
              url: '/api/users/login',
              type: "POST",
              data: {signedRequest : auth.authResponse.signedRequest, user: user},
              dataType: "json"
            });

            console.log('Velkommen, ' + user.name + '.');
        });
    } else {
        console.log('User cancelled login or did not fully authorize.');
    }
};

// FB SDK loaded
window.fbAsyncInit = function() {
    console.log("Facebook loaded");
    FB.init({
        appId      : '151681881541064',
        cookie     : true,
        channelUrl : 'http://socialmoney.com:3000/js/channel.html'
    });

    // listen for events
    FB.Event.subscribe('auth.authResponseChange', onLoginStatusChange);
};

// Load the SDK Asynchronously
(function(d){
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement('script'); js.id = id; js.async = true;
 js.src = "//connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
}(document));