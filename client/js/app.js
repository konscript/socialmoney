/*jslint browser: true */
/*global _, jQuery, $, console, Backbone */

var users = {};

(function($){
    
    users.User = Backbone.Model.extend({
    });
    
    users.Users = Backbone.Collection.extend({
        model: users.User,
        url: "users"
    });
    
    users.UserListView = Backbone.View.extend({
        tagName: 'ul',
        id: 'users-list',
        attributes: {"data-role": 'listview', "data-inset": 'true'},
        
        initialize: function() {
            this.collection.bind('add', this.add, this);
            this.template = _.template($('#users-list-item-template').html());
        },
        
        render: function() {
            var container = this.options.viewContainer,
                users = this.collection,
                template = this.template,
                listView = $(this.el);
                
            $(this.el).empty();
            users.each(function(activity){
                listView.append(template(activity.toJSON()));
            });
            container.html($(this.el));
            container.trigger('create');
            return this;
        },
        
        add: function(item) {
            var usersList = $('#users-list'),
                template = this.template;
                
            usersList.append(template(item.toJSON()));
            usersList.listview('refresh');
        }
    });
    
    users.initData = function(){
        users.users = new users.Users();
        users.users.fetch({async: false});  // use async false to have the app wait for data before rendering the list
    };
    
}(jQuery));

$('#home').live('pageinit', function(event){
    var usersListContainer = $('#home').find(":jqmData(role='content')"),
        usersListView;
    users.initData();
    usersListView = new users.UserListView({collection: users.users, viewContainer: usersListContainer});
    usersListView.render();
});

$('#add-button').live('click', function(){
    
    users.users.add({id: 6, name: 'Linus Torvalds', balance: '96'});
});

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
              url: '/users/login',
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