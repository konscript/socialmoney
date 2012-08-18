/**
 * Resource Routes
 */
module.exports = function(app) {

  //app.get('/users/login', user.login);
  var user = require('./resources/user')(app);
  var userResource = app.resource('users', user);

};