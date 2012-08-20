/**
 * Resource Routes
 */

var User = GLOBAL.models.User;


// route parameters: req.params
// GET: req.query
// POST: req.body

UserResource = {

  index: function(req, res) {
    User.findAll().success(function(users) {
      res.send(users);
    });
  },

  create: function(req, res) {
    var data = req.body;
    var allowedFields = ['facebook_id', 'email', 'first_name', 'last_name'];

    User.create(data, allowedFields).success(function(user) {
      res.send(user);
    }).error(function(error) {
        res.send("error" + error);
    });
  },

  show: function(req, res) {
  },

  update: function(req, res) {
  },

  destroy: function(req, res) {
  },

  login: function(req, res) {
    // set session - test
    //req.session.user_id = 2;
    console.log(req.session);
    res.send("logged in");
  },

  logout: function(req, res) {
    res.send(req.session.user_id);
  }
};

//
module.exports = UserResource;