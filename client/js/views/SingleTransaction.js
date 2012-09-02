views.SingleTransaction = Backbone.View.extend({

    id: "SingleTransaction",

    initialize: function() {},
    
    render: function() {

        var transaction = new models.Transactions({id: this.options.transactionId});
        transaction.fetch({async: false});



        // load template async
        this.loadTemplate();

        this.on('templateLoaded', function() {

          var renderedContent = this.template(transaction.toJSON());
          $('#main').html(renderedContent);
          return this;
        });
    }
});