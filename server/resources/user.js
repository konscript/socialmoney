/**
 * Resource Routes
 */
module.exports = {

  User: GLOBAL.models.User,
  users: ['tobi', 'loki', 'jane'],

  index: function(req, res) {
    this.User.findAll().success(function(projects) {
      var test = JSON.stringify(projects);
      res.send(test);
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