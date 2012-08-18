/**
 * Resource Routes
 */

var User = GLOBAL.models.User;

module.exports = {

  index: function(req, res) {
    User.findAll().success(function(users) {
      for (var i in users) {
        res.send(users[i]['first_name']);
      }
    });
  },

  'new': function(req, res) {
    // serv a view
  },

  create: function(req, res) {
    var post = req.body;

    var user = this.User.build({
        username: 'some user',
        password: 'secret123'
    });

    user.save().success(function() {
        res.send("yubii");
    }).error(function(error) {
        res.send("error" + error);
    });
  },

  show: function(req, res) {
    var user = this.users[req.params.user];
    res.send(user);
  },

  edit: function(req, res) {
    res.send('editing ' + req.params.user);
  },

  update: function(req, res) {
    res.send('updating ' + req.params.user);
  },

  destroy: function(req, res) {
    delete users[req.params.user];
    res.send('removed ' + req.params.user);
  },

  login: function(req, res) {
    res.send('logged in ' + req.params.user);
  },

  logout: function(req, res) {
    res.send('logged out');
  }
};