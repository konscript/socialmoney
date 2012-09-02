// Users
models.User = Backbone.Model.extend({
  defaults : {
    id: null,
    email : null,
    firstName : null,
    lastName : null
  },
  urlRoot: '/api/users'

});

models.Users = Backbone.Collection.extend({
    model: models.User,
    url: "/api/users"
});


// Transactions
// models.Transaction = Backbone.Model.extend({
//   defaults : {
//     id: 0,
//     title: "",
//     description: "",
//     totalAmount: 0,
//     date: null
//   },
//   urlRoot: '/api/transactions'

// });

models.SubTransactions = Backbone.RelationalModel.extend({
    urlRoot: "/api/subtransactions",
    idAttribute: 'id'
});

models.Transactions = Backbone.RelationalModel.extend({
    urlRoot: '/api/transactions',
    idAttribute: 'id',
    relations: [{
        type: Backbone.HasMany,
        key: 'subtransactions',
        relatedModel: 'models.SubTransactions',
        reverseRelation: {
            key: 'transactionId',
            includeInJSON: 'id'
        }
    }]
});

collections.Transactions = Backbone.Collection.extend({
    url: '/api/transactions',
    model: models.Transactions
})