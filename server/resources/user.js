var https = require("https");

/**
 * Resource Routes
 */

var User = GLOBAL.models.User;


// route parameters: req.params
// GET: req.query
// POST: req.body

var userResource = {

  index: function(req, res) {
    User.findAll().success(function(users) {
      res.send(users);
    });
  },

  create: function(req, res) {
    var data = req.body;
    var allowedFields = ['id', 'email', 'firstName', 'lastName'];

    User.create(data, allowedFields).success(function(user) {
      //res.json({user: user});
    }).error(function(error) {
      res.json({error: error}, 403);
    });
  },

  show: function(req, res) {
  },

  update: function(req, res) {
  },

  destroy: function(req, res) {
  },

  login: function(req, res) {

    var FB = require('fb');

    var signedRequestValue = req.body.signedRequest;
    var appSecret = GLOBAL.fb.secret;

    var signedRequest  = FB.parseSignedRequest(signedRequestValue, appSecret);
    if(signedRequest) {
        var user = req.body.user;
        user.id = signedRequest.user_id;
        user.firstName = user.first_name;
        user.lastName = user.last_name;
        
        try{

          // create user if he doesn't already exist
          User.find({where: ["id = ?", user.id]}).success(function(users) {
            if(users === null){
              GLOBAL.resources.user.create({body: user}, res);
            }
          });

          // set session id
          req.session.user_id = user.id;
          res.json({
            status: 'signed in',
            // signedRequest: signedRequest, // only for debugging - confidential!
            user: user
          });

        }
        catch(err) {
          res.json({error: err});
        }

    }else{
      res.json({status: 'could not parse signed request', signedRequest: signedRequest});
    }
  },

  logout: function(req, res) {
    delete req.session.user_id;
  }
};

module.exports = userResource;