 var _ = require("underscore");

/**
 * Sequelize ORM Models
 */

module.exports = {

  init: function() {

    var instance = GLOBAL.db.instance;
    var Sequelize = GLOBAL.db.Sequelize;

    var models = {
      'User': instance.define('User', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          validate: {
            isInt: true
          }
        },
        email: {
          type: Sequelize.STRING,
          validate: {
            isEmail: true
          }
        },
        firstName: {
          type: Sequelize.STRING,
          validate: {
            isAlpha: true
          }
        },
        lastName: {
          type: Sequelize.STRING,
          validate: {
            isAlpha: true
          }
        }
      }),

      'Transaction': instance.define('Transaction', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
          type: Sequelize.STRING,
          validate: {
            isAlphanumeric: true,
            notNull: true
          }
        },
        description: {
          type: Sequelize.TEXT,
          validate: {
            isAlphanumeric: true
          }
        },
        totalAmount: {
          type: Sequelize.INTEGER,
          validate: {
            isInt: true,
            min: 0
          }
        },
        date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      }, {
        classMethods: {
          findRelatedByUserId: function(user_id, callback) {
            var sql = "SELECT s.*, t.*, s.id AS subtransactionId FROM  SubTransactions s LEFT JOIN Transactions t ON t.id = s.TransactionId WHERE s.PayerId = " + user_id + " OR s.BorrowerId = " + user_id;
            instance.query(sql, models.Transaction).success(function(transactions) {

              var transactions_new = [];

              _.each(transactions, function(transaction) {

                var transaction_new = transaction.toJSON();

                // sey subtranaction
                 transaction_new.subtransactions = {
                  "id": transaction.subtransactionId,
                  "amount": transaction.amount,
                  "accepted": transaction.accepted,
                  "payerId": transaction.payerId,
                  "borrowerId": transaction.borrowerId
                };

                // remove
                delete transaction_new.subtransactionId;
                delete transaction_new.amount;
                delete transaction_new.accepted;
                delete transaction_new.payerId;
                delete transaction_new.borrowerId;
                delete transaction_new.transactionId;

                transactions_new.push(transaction_new);
              });

              callback(transactions_new);
            }).error(function(error) {
              callback(error);
            });
          }
        }
      }),

      'SubTransaction': instance.define('SubTransaction', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        amount: {
          type: Sequelize.INTEGER,
          validate: {
            isInt: true,
            min: 0
          }
        },
        accepted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          validate: {
            notNull: true
          }
        }
      }),

      'Balance': instance.define('Balance', {
        payerId: {
          type: Sequelize.INTEGER
        },
        borrowerId: {
          type: Sequelize.INTEGER
        },
        balance: {
          type: Sequelize.INTEGER
        }
      }, {
        timestamps: false
      }),

      'Group': instance.define('Group', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        date_start: {
          type: Sequelize.DATE,
          defaultValue: null
        },
        date_end: {
          type: Sequelize.DATE,
          defaultValue: null
        },
        title: {
          type: Sequelize.STRING,
          validate: {
            isAlphanumeric: true,
            notNull: true
          }
        },
        description: {
          type: Sequelize.TEXT,
          validate: {
            isAlphanumeric: true
          }
        }
      }),

      'GroupsUsers': instance.define('GroupsUsers', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        accepted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          validate: {
            notNull: true
          }
        },
        groupId: {
          type: Sequelize.INTEGER,
          validate: {
            isInt: true
          }
        },
        userId: {
          type: Sequelize.INTEGER,
          validate: {
            isInt: true
          }
        }
      })

    };

    // Associations
    models.User.hasOne(models.SubTransaction, {
      as: 'Payer',
      foreignKey: 'payerId'
    }).hasOne(models.SubTransaction, {
      as: 'Borrower',
      foreignKey: 'borrowerId'
    }).hasOne(models.Transaction, {
      foreignKey: 'createdBy'
    });
    // .hasMany(models.Group);
    models.Transaction.hasMany(models.SubTransaction, {
      as: 'SubTransactions',
      foreignKey: 'transactionId'
    });

    // models.Group
    //   .hasMany(models.User);
    // setup views
    instance.query("CREATE OR REPLACE VIEW BalanceFrom AS \
      SELECT a.payerId, a.borrowerId, SUM(a.amount) AS balance \
      FROM SubTransactions a \
      GROUP BY payerId, borrowerId; \
      \
      CREATE OR REPLACE VIEW BalanceTo AS \
      SELECT a.borrowerId as payerId, a.payerId as borrowerId, -SUM(a.amount) AS balance \
      FROM SubTransactions a \
      GROUP BY payerId, borrowerId; \
      \
      CREATE OR REPLACE VIEW BalanceUnion AS \
      SELECT * FROM BalanceFrom \
      UNION \
      SELECT * FROM BalanceTo; \
      \
      DROP TABLE IF EXISTS Balances; \
      CREATE OR REPLACE VIEW Balances AS \
      SELECT payerId, borrowerId, sum(balance) as balance FROM BalanceUnion GROUP BY payerId, borrowerId;");

    // create all tables in database if they do not exist
    instance.sync({
      force: false
    });

    return models;
  }
};