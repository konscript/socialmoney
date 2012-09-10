/**
 * Resource Routes
 */

 var _ = require("underscore");


var Transaction = GLOBAL.models.Transaction;
var SubTransaction = GLOBAL.models.SubTransaction;


// route parameters: req.params
// GET: req.query
// POST: req.body


module.exports = {

  index: function(req, res) {

    Transaction.findRelatedByUserId(req.session.user_id, function(transactions){
      res.send(transactions);
    });

  },

  create: function(req, res) {

    var data = req.body;
    data.createdBy = req.session.user_id;
    var allowedFields = ['title', 'description', 'totalAmount', 'date', 'createdBy'];

    Transaction.create(data, allowedFields).success(function(transaction) {

      // insert associated data
      if(data.subtransactions.constructor == Array && data.subtransactions.length > 0){
        _.each(data.subtransactions, function(subtransaction) {

          var request = req;
          request.body = subtransaction;
          request.body.transactionId = transaction.id;
          GLOBAL.resources.subtransaction.create(request);
        });
      }

      res.send(transaction);
    }).error(function(error) {
        res.send("error" + error);
    });
  },

  show: function(req, res) {
    var transactionId = parseInt(req.params.transaction, 10);
    Transaction.find({
      where: {
        id: transactionId
      }
    }).success(function(transaction) {

      // count number of subtransactions in transaction that the user can access. Must be at least one to access the transaction
      SubTransaction.count({
        where: ['transactionId=? and (borrowerId=? or payerId=?)', transactionId, req.session.user_id, req.session.user_id]
      }).success(function(numberOfSubTransactions) {

        // Note: If the user can see a single subtransaction, he is allowed to view the entire transactions and all related subtransactions
        if(numberOfSubTransactions > 0){
          transaction.getSubTransactions().success(function(subtransactions) {
            var data = transaction.toJSON();
            data.subtransactions = subtransactions;
            res.json(data);
          });
        }else{
          res.json({"status": "numberOfSubTransactions is zero"});
        }
      });
    });
  },

  update: function(req, res) {
    var data = req.body;

    Transaction.find(parseInt(req.params.transaction, 10)).success(function(transaction) {
      if(transaction){
        transaction.save(['title', 'description', 'totalAmount']).success(function() {
          res.send('updated');
        });
      }else{
        res.send('not found');
      }
      // where: ["id = ?", req.params.transaction]}
    });
  },

  destroy: function(req, res) {
    delete transactions[req.params.transaction];
    res.send('removed ' + req.params.transaction);
  }
};