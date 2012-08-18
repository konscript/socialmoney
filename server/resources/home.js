/**
 * Resource Routes
 */
module.exports = {

  Home: GLOBAL.models.Home,

  init: function(){},

  index: function(req, res) {
    res.send(JSON.stringify("test"));
  }
};