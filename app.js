// Module dependencies.
var express = require('express');
var resource = require('express-resource');
var app = express();
var _ = require("underscore");
var path = require('path');

/**
* app
* @type {Express}
*
* The Singleton of Express app instance
*/
GLOBAL.app = app;

/**
* Retrieve Command Line Arguments
* [0] process : String 'node'
* [1] app : void
* [2] port : Number 8010
*/
var args = process.argv;

/**
* port
* @type {Number}
*
* HTTP Server Port
*/
var port = args[2] ? args[2] : 3000;

var checkAuth = function(req, res, next) {

    // access granted if session id availbable OR route is public OR extension is allowed
    if( req.session.user_id || req.url.indexOf("/api/") === -1 ){
        next();
    } else {
        res.statusCode = 403;
        res.json({status: "not logged in", session: req.session});
    }
};


// database
GLOBAL.db = require('./server/database.js')();

// Configuration
app.configure(function() {
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.cookieParser());

    // session handling in memorystore
    var MemoryStore = require('connect').session.MemoryStore;
    app.use(express.session({ secret: GLOBAL.fb.secret, store: new MemoryStore({ reapInterval:  60000 * 10 })}));

    // check login state before routing
    app.use(checkAuth);

    app.use(express.methodOverride());
    app.use(app.router);

    // set static routes
    app.use("/", express.static(__dirname + '/client'));
});

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function() {
    app.use(express.errorHandler());
});

// models
GLOBAL.models = require('./server/models.js').init();

// resources
GLOBAL.resources = {};
GLOBAL.resources.dashboard = require('./server/resources/dashboard.js');
GLOBAL.resources.user = require('./server/resources/user.js');
GLOBAL.resources.transaction = require('./server/resources/transaction.js');
GLOBAL.resources.subtransaction = require('./server/resources/subtransaction.js');


// routes
GLOBAL.routes = require('./server/routes.js').init();


// HTTP Server
app.listen(port);
console.log('Express server listening on port %d in %s mode using Sequelize ORM.', port, app.settings.env);