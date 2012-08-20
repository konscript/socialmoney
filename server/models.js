/**
 * Sequelize ORM Models
 */

module.exports = {

  init: function(){

    var instance = GLOBAL.db.instance;
    var Sequelize = GLOBAL.db.Sequelize;

    var models = {
       'User': instance.define('User', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        facebookId: {type: Sequelize.INTEGER, validate: {isInt: true} },
        email: {type: Sequelize.STRING, validate: {isEmail: true} },
        firstName: {type: Sequelize.STRING, validate: {isAlpha: true} },
        lastName: {type: Sequelize.STRING, validate: {isAlpha: true} }
      }),
       
      'Transaction': instance.define('Transaction', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        title: {type: Sequelize.STRING, validate: {isAlphanumeric: true, notNull: true} },
        description: {type: Sequelize.TEXT, validate: {isAlphanumeric: true} },
        totalAmount: {type: Sequelize.INTEGER, validate: {isInt: true, min: 0} },
        date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
      },{
        classMethods: {
          findRelatedByUserId: function(user_id, callback) {
            var sql = "SELECT * FROM  SubTransactions LEFT JOIN Transactions ON Transactions.id = SubTransactions.TransactionId WHERE PayerId = "+user_id+" OR BorrowerId = "+user_id;
            instance.query(sql, models.Transaction).success(function(transactions) {
              console.log(transactions);
              callback(transactions);
            }).error(function(){
              console.log("ASDKALDADDLA");
              callback("lort");
            });
          }
        }
      }),
       
      'SubTransaction': instance.define('SubTransaction', {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        amount: {type: Sequelize.INTEGER, validate: {isInt: true, min: 0} },
        accepted: { type: Sequelize.BOOLEAN, defaultValue: false, validate: {notNull: true} }
      })
    };

    // Associations
    models.User
      .hasOne(models.SubTransaction, { as: 'Payer', foreignKey: 'PayerId' })
      .hasOne(models.SubTransaction, { as: 'Borrower', foreignKey: 'BorrowerId' })
      .hasOne(models.Transaction, {foreignKey: 'createdBy'});

    models.Transaction
      .hasMany(models.SubTransaction);


    // create all tables in database if they do not exist
    instance.sync({force: false});

    return models;
  }
};