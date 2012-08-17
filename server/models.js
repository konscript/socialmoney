/**
 * Sequelize ORM Models
 */
module.exports = function() {
  var Sequelize = require('sequelize');

  var db = new Sequelize('socialmoneyjs', 'root', 'heyzan', {
      host: "localhost",
      port: 3306
  });

  var models = {
     'User': db.define('User', {
      id: Sequelize.INTEGER,
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      email: Sequelize.STRING
    }),
     
    'Transaction': db.define('Transaction', {
      id: Sequelize.INTEGER,
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      date: Sequelize.DATE
    }),
     
    'SubTransaction': db.define('SubTransaction', {
      id: Sequelize.INTEGER,
      amount: Sequelize.STRING,
      from_id: Sequelize.INTEGER,
      to_id: Sequelize.INTEGER
    })
  };

  debugger

  models.User.sync(); // will emit success or failure event
  models.Transaction.sync(); // will emit success or failure event

  return models;
};