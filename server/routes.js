/**
 * Resource Routes
 */
module.exports = {

  init: function(){

    app.get('/', GLOBAL.resources.mixed.frontpage),

    /*
    * USERS
    ********************************/

    // additional user routes
    app.post('/api/users/login', GLOBAL.resources.user.login);
    app.get('/api/users/logout', GLOBAL.resources.user.logout);

    app.resource('api/users', GLOBAL.resources.user);

    /*
    * TRANSACTIONS
    ********************************/
    app.resource('api/transactions', GLOBAL.resources.transaction);
    app.resource('api/subtransactions', GLOBAL.resources.subtransaction);

  }

};
