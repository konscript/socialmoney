views.Dashboard = Backbone.View.extend({

  name: 'Dashboard',
  el: "#main",

  initialize: function() {
    this.collection_credit = new collections.Dashboard();

    this.collection_debit = new collections.Dashboard();

    this.collection_debit.fetch({
      data: {type: "debit"},
      async: false
    });

    this.collection_credit.fetch({
      data: {type: "credit"},
      async: false
    });

  },

  afterRender: function() {
    var self = this;

    self.$el.html(self.template());


    // list those the user owes money
    this.loadTemplate("Dashboard-top", function(template) {
      self.collection_debit.getNamesFromFacebook("payerId", function(data){
        self.$el.children('#debit').html(template({data: data}));
      });
    });


    // list those who owe the user money
    this.loadTemplate("Dashboard-top", function(template) {
      self.collection_credit.getNamesFromFacebook("borrowerId", function(data){
        self.$el.children('#credit').html(template({data: data}));
      });
    });


    return this;
  }
});