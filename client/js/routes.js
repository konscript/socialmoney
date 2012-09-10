var AppRouter = Backbone.Router.extend({
    loadedPages: [],
    routes: {
        // users
        "users/:id": "SingleUser",

        // transactions
        "transactions/new": "NewTransaction",
        "transactions/:id": "SingleTransaction",
        "transactions/": "IndexTransaction",

        "": "Dashboard",
        "*actions": "defaultRoute" // Backbone will try match the route above first
    },

    // users
    SingleUser: function(userId){
        this.changePage("SingleUser", {userId: userId});
    },

    // transactions
    NewTransaction: function(transactionId){
        this.changePage("NewTransaction");
    },

    SingleTransaction: function(transactionId){
        this.changePage("SingleTransaction", {transactionId: transactionId});
    },

    IndexTransaction: function(){
        this.changePage("IndexTransaction");
    },

    // frontpage
    Dashboard: function(){
        this.changePage("Dashboard");
    },

    // default
    defaultRoute: function(){
        alert("default route");
    },

    changePage:function (pageName, args) {

        // set default args
        if(args === undefined){ args = {}; }

        if(!this.loadedPages[pageName]){
            var Page = views[pageName];
            this.loadedPages[pageName] = new Page(args);
            console.log("Loading " + this.loadedPages[pageName].name);
        }

        var page = this.loadedPages[pageName];

        if(page.loadTemplate !== false){
            page.loadTemplate();
        }
        
        //$.mobile.changePage($(page.el), {changeHash:false});
    }

});