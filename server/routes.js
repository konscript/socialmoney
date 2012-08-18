/**
 * Resource Routes
 */
module.exports = {

  init: function(){
    this.users();
    this.home();
  },

  users: function(){
    app.resource('users',GLOBAL.resources.user);
  },

  home: function(){
    app.resource(GLOBAL.resources.home);
  }

};
