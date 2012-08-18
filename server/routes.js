/**
 * Resource Routes
 */
module.exports = {

  init: function(){

	// additional user routes
	app.get('/users/login/:id', GLOBAL.resources.user.login);
	app.get('/users/logout', GLOBAL.resources.user.logout);

	// users
    app.resource('users',GLOBAL.resources.user);
  }

};
