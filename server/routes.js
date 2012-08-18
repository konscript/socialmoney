/**
 * Resource Routes
 */
module.exports = {

  init: function(){

  	// users
    app.resource('users',GLOBAL.resources.user);
  }

};
