/**
 * Database Connection
 */
module.exports = function() {
    var Sequelize = require('sequelize');

    var database = new Sequelize('socialmoneyjs', 'root', 'heyzan', {
        host: "localhost",
        port: 3306
    });

    return database;
};