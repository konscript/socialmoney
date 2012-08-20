/**
 * Resource Routes
 */

 var _ = require("underscore");


var Transaction = GLOBAL.models.Transaction;

var filterAllowedFields = function(allowedFields, model, data){
  _.each(allowedFields, function(field) {
      if(data[field]){
        model[field] = data[field];
      }
  });
  return model;
};

// route parameters: req.params
// GET: req.query
// POST: req.body

module.exports = {

  index: function(req, res) {

    Transaction.findRelatedByUserId(req.session.user_id, function(transactions){
      res.send(transactions);
    });

    // // TODO: show all Transactions which is either createdBy user, or has a SubTransaction which has BorrowerId user.
    // Transaction.find({ where: {createdBy: req.session.user_id} }).success(function(transactions) {
    //   res.send(transactions);
    // });
  },

  create: function(req, res) {
    var data = req.body;
    data.createdBy = req.session.user_id;
    var allowedFields = ['title', 'description', 'totalAmount', 'createdBy'];

    Transaction.create(data, allowedFields).success(function(transaction) {
      res.send(transaction);
    }).error(function(error) {
        res.send("error" + error);
    });
  },

  show: function(req, res) {
    Transaction.find(parseInt(req.params.transaction, 10)).success(function(transaction) {
      res.send(transaction);
    });
  },

  update: function(req, res) {
    var data = req.body;
    var allowedFields = ['title', 'description', 'totalAmount'];

    Transaction.find(parseInt(req.params.transaction, 10)).success(function(transaction) {
      if(transaction){
        transaction = filterAllowedFields(allowedFields, transaction, data);
        transaction.save(allowedFields).success(function() {
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