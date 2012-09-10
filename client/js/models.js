// Users
models.Users = Backbone.Model.extend({
  defaults: {
    id: null,
    email: null,
    firstName: null,
    lastName: null
  },
  urlRoot: '/api/users'

});

collections.Users = Backbone.Collection.extend({
  model: models.Users,
  url: "/api/users"
});


// Transactions
models.Transactions = Backbone.Model.extend({
  defaults: {
    title: "",
    description: "",
    totalAmount: 0,
    date: null,
    subtransactions: []
  },
  urlRoot: '/api/transactions',

  initialize: function() {
    _.bindAll(this);
  },

  getNamesFromFacebook: function(callback) {
    var self = this;

    facebook.getFriends(function(friends){
      _.each(self.toJSON().subtransactions, function(subtransaction){
        var user = friends.filter(function(friend) { return friend.id == subtransaction.borrowerId; });
        if(user.length > 0 ){
          subtransaction.name = user[0].name;
        }
      });
      callback(self.toJSON());
    });
  }

});

collections.Transactions = Backbone.Collection.extend({
  url: '/api/transactions',
  model: models.Transactions
});

// Dashboard
models.Dashboard = Backbone.Model.extend({
  urlRoot: '/api/dashboard/top'
});

collections.Dashboard = Backbone.Collection.extend({
  model: models.Dashboard,
  url: "/api/dashboard/top",

  getNamesFromFacebook: function(user_key, callback) {
    var self = this;

    facebook.getFriends(function(friends){
      var data = self.toJSON();
      _.each(data, function(balance){

        var user = friends.filter(function(friend) {
          return friend.id == balance[user_key];
        });
        if(user.length > 0 ){
          balance.name = user[0].name;
        }
      });
      callback(data);
    });
  }
});
