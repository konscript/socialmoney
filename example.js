/**
 * Module dependencies.
 */

var express = require("express");
var resource = require('express-resource');
var app = express();
app.use(express.logger());

var users = ['tobi', 'loki', 'jane'];


// ressources
var user = {
  index: function(req, res){
    switch (req.format) {
      case 'json':
        res.send(users);
        break;
      default:
        res.contentType('txt');
        res.send(users.join(', '));
    }
  },
  
  show: function(req, res){
    var user = users[req.params.user];
    res.send(user);
  },
  
  edit: function(req, res){
    res.send('editing ' + req.params.user);
  },

  update: function(req, res){
    res.send('updating ' + req.params.user);
  },
  
  destroy: function(req, res){
    delete users[req.params.user];
    res.send('removed ' + req.params.user);
  },
  
  login: function(req, res){
    res.send('logged in ' + req.params.user);
  },
  
  logout: function(req, res){
    res.send('logged out');
  }
};


// routes
app.get('/users/login', user.login);
var userResource = app.resource('users', user);


app.listen(3000);
console.log('Express server listening on port %d in %s mode using Sequelize ORM.', 3000, app.settings.env);
