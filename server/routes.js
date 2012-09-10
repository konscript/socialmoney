/**
 * Resource Routes
 */
module.exports = {

  init: function() {
    
    // Serve base with all js views (kinda dumb but whatever)
    app.get('/', function(req, res) {
      var _ = require("underscore");
      var fs = require('fs');

      fs.readdir("client/js/views/", function(err, filenames) {
        var files = [];
        _.each(filenames, function(filename) {
          var ext = filename.substr(filename.lastIndexOf('.') + 1);
          if (ext == "js") {
            files.push('js/views/' + filename);
          }
        });

        // output
        res.render(__dirname + "/views/base.jade", {
          views: files
        });

      });
    }),


    /*
     * Dashboard
     ********************************/

    // additional user routes
    app.get('/api/dashboard/top', GLOBAL.resources.dashboard.top);
    app.get('/api/dashboard/totalsum', GLOBAL.resources.dashboard.totalsum);

    /*
     * USERS
     ********************************/

    // additional user routes
    app.post('/users/login', GLOBAL.resources.user.login);
    app.get('/users/logout', GLOBAL.resources.user.logout);

    app.resource('api/users', GLOBAL.resources.user);

    /*
     * TRANSACTIONS
     ********************************/
    app.resource('api/transactions', GLOBAL.resources.transaction);
    app.resource('api/subtransactions', GLOBAL.resources.subtransaction);

  }

};