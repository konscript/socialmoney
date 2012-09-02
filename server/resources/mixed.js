module.exports = {

  // Serve frontpage with all views (kinda dumb but whatever)
  frontpage: function(req, res) {
    fs = require('fs');

    fs.readdir("client/js/views/", function(err, filenames) {
      var i;
      var files = [];
      for (i = 0; i < filenames.length; i++) {
        files.push('js/views/' + filenames[i]);
      }

      // output
      res.render(__dirname + "/../views/index.jade", {
        views: files
      });

    });
  }
};