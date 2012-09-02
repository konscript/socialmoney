views.SingleUser = Backbone.View.extend({

    id: "SingleUser",

    //since this template will render inside a div, we don't need to specify a tagname
    initialize: function() {
    },
    
    render: function() {

        var user = new models.User({id: this.options.userId});
        user.fetch({async: false});

        // load template async
        this.loadTemplate();

        this.on('templateLoaded', function() {

          var renderedContent = this.template(user.toJSON());
          $('#main').html(renderedContent);
          return this;
        });
    }
});