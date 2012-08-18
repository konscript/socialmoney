module.exports = function() {

  var Sequelize = require('sequelize');

  var instance = new Sequelize('socialmoneyjs', 'root', 'heyzan', {
      host: "localhost",
      port: 3306
  });

  var db = {};
  db.instance = instance;
  db.Sequelize = Sequelize;

  return db;
};