var AppRouter = Backbone.Router.extend({
    routes: {
        // users
        "users/:id": "SingleUser",

        // transactions
        "transactions/:id": "SingleTransaction",

        // transactions
        "transactions": "IndexTransaction",

        "": "FrontPage",
        "*actions": "defaultRoute" // Backbone will try match the route above first
    },

    // users
    SingleUser: function(userId){
        this.changePage(new views.SingleUser({userId: userId}));
    },

    // transactions
    SingleTransaction: function(transactionId){
        this.changePage(new views.SingleTransaction({transactionId: transactionId}));
    },

    IndexTransaction: function(){
        this.changePage(new views.IndexTransaction());
    },

    // frontpage
    FrontPage: function(){
        this.changePage(new views.FrontPage());
    },

    // default
    defaultRoute: function(){
        alert("default route");
    },

    changePage:function (page) {
        page.render();
        $('body').append($(page.el));
        //$.mobile.changePage($(page.el), {changeHash:false});
    }

});