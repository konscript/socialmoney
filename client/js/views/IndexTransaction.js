views.IndexTransaction = Backbone.View.extend({

  name: "IndexTransaction",
  el: "#main",


  initialize: function() {

    this.collection = new collections.Transactions();
    this.collection.fetch({
      async: false
    });

  },

  afterRender: function() {
    var self = this;
    $(self.el).empty();

    this.collection.each(function(transaction) {
      $(self.el).append(
        $(self.template(transaction.toJSON()))
      );
    });

    return this;

  }
});