/**
 * Resource Routes
 */
module.exports = {

  init: function(){

  	// top level
    app.resource(GLOBAL.resources.home);

  	// users
    app.resource('users',GLOBAL.resources.user);
  }

};
