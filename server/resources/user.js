/**
 * Resource Routes
 */

_ = require("underscore");

var User = GLOBAL.models.User;

module.exports = {

  index: function(req, res) {
    User.findAll().success(function(users) {
      _.each(users, function(user, key){
        res.send(user['first_name']);
      });
    });
  },

  'new': function(req, res) {
    // serv a view
  },

  create: function(req, res) {
    var post = req.body;
    var allowedFields = ['facebook_id'];

    User.create(post, allowedFields).success(function(user) {
      res.send(user);
    }).error(function(error) {
        res.send("error" + error);
    });
  },

  show: function(req, res) {
    var user = this.users[req.params.user];
    res.send(user);
  },

  edit: function(req, res) {
    // serve a view
  },

  update: function(req, res) {
    var allowedFields = ['email'];

    user.email = req.params.email;
    user.save(allowedFields).success(function() {
      res.send('updated');
    });
  },

  destroy: function(req, res) {
    delete users[req.params.user];
    res.send('removed ' + req.params.user);
  },

  login: function(req, res) {
    // set session - test
    req.session.user_id = req.params.id;
    console.log(req.session);
    res.send("done");
  },

  logout: function(req, res) {
    res.send(req.session.user_id);
  }
};