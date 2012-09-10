views.SingleTransaction = Backbone.View.extend({

  name: "SingleTransaction",
  el: "#main",


  initialize: function() {
    this.model = new models.Transactions({
      id: this.options.transactionId
    });
    this.model.fetch({
      async: false
    });
  },

  afterRender: function() {
    var self = this;

    this.model.getNamesFromFacebook(function(transaction){

      self.$el.html(
        self.template(transaction)
      );

      return self;
    });
  }
});