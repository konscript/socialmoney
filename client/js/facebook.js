var facebook = {

  auth: null,
  friends: [],

  // get list of friends
  getFriends: function(callback) {
    var self = this;
    if (this.friends.length === 0) {
      FB.api('/me/friends', function(friends) {
        // add current user to friends list
        friends.data.push({
          id: facebook.current_user.id,
          name: facebook.current_user.name
        });

        self.friends = friends.data;
        callback(friends.data);

      });
    } else {
      callback(this.friends);
    }
  },

  // login status has changed - user has either loggedin or out
  onLoginStatusChange: function() {
    var self = this;
    console.log("Logging in...");

    if (this.auth.authResponse) {
      // get personal information and login backend
      FB.api('/me', function(user) {
        self.current_user = user;

        $.ajax({
          url: '/users/login',
          type: "POST",
          data: {
            signedRequest: self.auth.authResponse.signedRequest,
            user: user
          },
          dataType: "json"
        });

        console.log('Velkommen, ' + user.name + '.');
        self.trigger('logged-in');
      });

    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }
};

_.extend(facebook, Backbone.Events);


// FB SDK loaded
window.fbAsyncInit = function() {
  console.log("Facebook loaded");
  FB.init({
    appId: '151681881541064',
    cookie: true,
    channelUrl: 'http://socialmoney.com:3000/js/channel.html'
  });

  // listen for events
  FB.Event.subscribe('auth.authResponseChange', function(auth) {
    facebook.auth = auth;
    facebook.onLoginStatusChange();
  });
};

// Load the SDK Asynchronously
(function(d) {
  var js, id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement('script');
  js.id = id;
  js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));