/**
 * Resource Routes
 */
module.exports = {

  init: function(){

    /*
    * USERS
    ********************************/

    // additional user routes
    app.post('/users/login', GLOBAL.resources.user.login);
    app.get('/users/logout', GLOBAL.resources.user.logout);

    app.resource('users', GLOBAL.resources.user);

    /*
    * TRANSCTIONS
    ********************************/
    app.resource('transactions', GLOBAL.resources.transaction);
  }

};
