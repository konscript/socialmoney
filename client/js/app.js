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
            users.each(function(user){
                var renderedItem = template(user.toJSON()),
                    $renderedItem = $(renderedItem);  //convert the html into an jQuery object
                    //console.log(user.get('id'));
                    $renderedItem.jqmData('userId', user.get('id'));  //set the data on it for use in the click event
                $renderedItem.bind('click', function(){
                    //set the activity id on the page element for use in the details pagebeforeshow event
                    $('#user-details').jqmData('userId', $(this).jqmData('userId'));  //'this' represents the element being clicked
                });
                listView.append($renderedItem);
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

    users.UserDetailsView = Backbone.View.extend({
        //since this template will render inside a div, we don't need to specify a tagname
        initialize: function() {
            this.template = _.template($('#user-details-template').html());
        },
        
        render: function() {
            //console.log(this.model);
            var container = this.options.viewContainer,
                user = this.model,
                renderedContent = this.template(this.model.toJSON());
                
            container.html(renderedContent);
            container.trigger('create');
            return this;
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
    
    users.users.add({id: 6, firstName: 'Linus', lastName: 'Torvalds', balance: '96'});
});


$('#user-details').live('pagebeforeshow', function(){
    console.log('userId: ' + $('#user-details').jqmData('userId'));
    var usersDetailsContainer = $('#user-details').find(":jqmData(role='content')"),
        userDetailsView,
        userId = $('#user-details').jqmData('userId'),
        usersModel = users.users.get(userId);

    userDetailsView = new users.UserDetailsView({model: users.users.get(userId), viewContainer: usersDetailsContainer});
    userDetailsView.render();
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