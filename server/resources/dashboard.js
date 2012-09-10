var _ = require("underscore");

var Balance = GLOBAL.models.Balance;
var instance = GLOBAL.db.instance;

module.exports = {

  // TOP 5
  top: function(req, res) {

    var where_clause = req.query.type == "credit" ? "payerId = ? && balance > 0" : "borrowerId = ? && balance > 0";

    Balance.findAll({
      where: [where_clause, req.session.user_id],
      order: 'balance DESC',
      limit: 5
    }).success(function(balance) {
      res.json(balance);
    });
  },



  totalsum: function(req, res) {

    // find top 10 borrowers
    instance.query(
      "SELECT SUM( balance ) AS total FROM Balances WHERE borrowerId = '"+req.session.user_id + "'",
      Balance).success(function(balance) {
      res.json(balance);
    });

  }

};