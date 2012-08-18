/*jslint browser: true */
/*global _, jQuery, $, console, Backbone */

var users = {};

(function($){
    
    users.User = Backbone.Model.extend({
    });
    
    users.Users = Backbone.Collection.extend({
        model: users.User,
        url: "users.json"
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