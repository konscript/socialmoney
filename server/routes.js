/**
 * Resource Routes
 */
module.exports = {

  init: function(){


    // function isLoggedIn(req, res, next) {
    //   if(req.session.user_id){
    //     console.log("NEEEXT");
    //     next();
    //   }else{
    //   }
    // }

    // app.all('/*', function(req, res, next){

  
    // });

    /*
    * USERS
    ********************************/

    // additional user routes
    app.get('/users/login', GLOBAL.resources.user.login);
    app.get('/users/logout', GLOBAL.resources.user.logout);

    // users
    app.resource('users', GLOBAL.resources.user);

    /*
    * TRANSCTIONS
    ********************************/
    app.resource('transactions', GLOBAL.resources.transaction);
  }

};
