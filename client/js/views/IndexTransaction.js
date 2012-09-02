views.IndexTransaction = Backbone.View.extend({

  id: "IndexTransaction",
  el: $('#main'),

  initialize: function() {},

  render: function() {
    var self = this;
    var transaction_collection = new collections.Transactions();
    transaction_collection.fetch({async: false});

    // load template async
    this.loadTemplate();

    this.on('templateLoaded', function() {

      transaction_collection.each(function(transaction) {
        var renderedItem = self.template(transaction.toJSON());
        var $renderedItem = $(renderedItem);

        $('#main').append($renderedItem);
      });

      return this;
    });
  }
});