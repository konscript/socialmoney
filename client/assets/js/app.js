// Facebook Async Init
window.fbAsyncInit = function() {
  FB.init({
    appId      : 'YOUR_APP_ID', // App ID
    channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });
  // Additional initialization code here
};

user = new FacebookUser();

// callback example:
// callback = function(model, response) {}
user.on('facebook:connected',    callback);
user.on('facebook:disconnected', callback);
user.on('facebook:unauthorized', callback);
user.login();
user.fetch();