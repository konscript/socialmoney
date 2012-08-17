/**
 * Resource Routes
 */
module.exports = function(app) {

    var users = ['tobi', 'loki', 'jane'];


    // ressources
    return {
        index: function(req, res) {
            res.send(users);
        },

        show: function(req, res) {
            var user = users[req.params.user];
            res.send(user);
        },

        edit: function(req, res) {
            res.send('editing ' + req.params.user);
        },

        update: function(req, res) {
            res.send('updating ' + req.params.user);
        },

        destroy: function(req, res) {
            delete users[req.params.user];
            res.send('removed ' + req.params.user);
        },

        login: function(req, res) {
            res.send('logged in ' + req.params.user);
        },

        logout: function(req, res) {
            res.send('logged out');
        }
    };
};