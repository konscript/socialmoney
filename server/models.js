/**
 * Sequelize ORM Models
 */
module.exports = function() {

  var instance = GLOBAL.db.instance;
  var Sequelize = GLOBAL.db.Sequelize;

  var models = {
     'User': instance.define('User', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      facebook_id: Sequelize.INTEGER,
      email: Sequelize.STRING,
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING
    }),
     
    'Transaction': instance.define('Transaction', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    }),
     
    'SubTransaction': instance.define('SubTransaction', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      amount: Sequelize.STRING,
      from_id: Sequelize.INTEGER,
      to_id: Sequelize.INTEGER
    })
  };

  // setup relations
  models.User.hasOne(models.Transaction);

  // create all tables in database if they do not exist
  instance.sync();

  return models;
};