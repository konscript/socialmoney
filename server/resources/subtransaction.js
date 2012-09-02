/**
 * Resource Routes
 */

 var _ = require("underscore");


var SubTransaction = GLOBAL.models.SubTransaction;

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

    SubTransaction.findAll({
        where: ['borrowerId=? or payerId=?', req.session.user_id, req.session.user_id]
    }).success(function(subtransactions){
      res.send(subtransactions);
    });

  },

  create: function(req, res) {
    // TODO: lav check på, om borrowerId, er en selv eller ens ven

    var data = req.body;
    data.payerId = req.session.user_id;
    var allowedFields = ['amount', 'borrowerId', 'transactionId', 'payerId'];

    SubTransaction.create(data, allowedFields).success(function(subtransaction) {
      if(res){
        res.json(subtransaction);
      }
    }).error(function(error) {
      res.send("SQL error" + error);
    });
  },

  show: function(req, res) {
    SubTransaction.find(parseInt(req.params.subtransaction, 10)).success(function(subtransaction) {
      res.send(subtransaction);
    });
  },

  update: function(req, res) {
    var data = req.body;
    var allowedFields = ['title', 'description', 'totalAmount'];

    SubTransaction.find(parseInt(req.params.subtransaction, 10)).success(function(subtransaction) {
      if(subtransaction){
        subtransaction = filterAllowedFields(allowedFields, subtransaction, data);
        subtransaction.save(allowedFields).success(function() {
          res.send('updated');
        });
      }else{
        res.send('not found');
      }
      // where: ["id = ?", req.params.subtransaction]}
    });
  },

  destroy: function(req, res) {
    delete subtransactions[req.params.subtransaction];
    res.send('removed ' + req.params.subtransaction);
  }
};