views.FrontPage = Backbone.View.extend({

  id: 'FrontPage',
  tagName: 'ul',
  attributes: {
    "data-role": 'listview',
    "data-inset": 'true'
  },

  initialize: function() {},

  render: function() {
    var self = this;

    var users = new models.Users();
    users.fetch({async: false});  // use async false to have the app wait for data before rendering the list

    // load template async
    this.loadTemplate();

    this.on('templateLoaded', function() {
      var frontPage = $(this.el);

      users.each(function(user) {
        var renderedItem = self.template(user.toJSON());
        var $renderedItem = $(renderedItem);

        frontPage.append($renderedItem);
      });

      $('#main').html(frontPage);

    });
    return this;
  },

  add: function(item) {
    var usersList = $('#users-list'),
      template = this.template;

    usersList.append(template(item.toJSON()));
    usersList.listview('refresh');
  }
});