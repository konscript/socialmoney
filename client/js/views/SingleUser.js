views.SingleUser = Backbone.View.extend({

    name: "SingleUser",
    el: "#main",

    initialize: function() {$()
        // models
        this.model = new models.Users({
            id: this.options.userId
        });

        this.model.fetch({
            async: false
        });
    },

    render: function() {
        return this;
    },

    afterRender: function() {
        var renderedContent = this.template(this.model.toJSON());
        $("#main").html(renderedContent);
        return this;
    }
});