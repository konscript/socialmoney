views.NewTransaction = Backbone.View.extend({

  name: "NewTransaction",
  el: "#main",
  subtransactions: [],

  initialize: function() {

  },

  events: {
    'click input.save': 'clickSave',
    'click .friend .delete': 'clickDeleteFriend',
    'keyup .friend input.amount': 'keyupAmount',
    'keyup #totalAmount': function() {
      this.updateAmountForEverybody();
      this.updateList();
    }
  },


  clickSave: function() {
    transaction = new models.Transactions({
      title: $('input[name="title"]').val(),
      date: $('input[name="date"]').val(),
      //description: $('input[name="title"]').val(),
      totalAmount: $('#totalAmount').val(),
      subtransactions: this.subtransactions
    });
    transaction.save();

    // empty
    subtransactions = [];

    // redirect
    window.location.hash = "#/";
  },

  clickDeleteFriend: function(e) {
    e.preventDefault();
    var self = this;
    var borrowerId = $(e.target).parent('.friend').data('borrowerid');

    // find friend by id and remove him
    this.subtransactions.filter(function(friend, i) {
      if (friend.borrowerId === borrowerId) {
        self.subtransactions.remove(i);
      }
    });

    this.updateTotalAmount();
    this.updateList();
  },

  keyupAmount: function(e) {
    var borrowerId = $(e.target).parent('.friend').data('borrowerid');
    var amount = $(e.target).val();

    // find friend by is and update his amount
    this.subtransactions.filter(function(friend) {
      if (friend.borrowerId === borrowerId) {
        friend.amount = amount;
      }
    });

    this.updateTotalAmount();
  },

  addToList: function(event, ui) {

    // list
    this.subtransactions.push({
      borrowerId: ui.item.borrowerId,
      name: ui.item.label,
      amount: 0
    });

    // distribute total amount evenly
    this.updateAmountForEverybody();

    // UI
    this.updateList();

  },

  // re-render list template
  updateList: function() {
    var self = this;

    this.loadTemplate("NewTransaction-list", function(template) {
      var resultList = $(self.el).children('#resultList');

      // empty container
      resultList.empty();

      // re-populate list with friends
      _.each(self.subtransactions, function(friend) {
        resultList.append($(template(friend))).trigger('create');
      });
    });
  },

  updateTotalAmount: function() {
    var totalAmount = 0;
    _.each(this.subtransactions, function(friend) {
      totalAmount += parseInt(friend.amount, 10);
    });

    // UI
    $('#totalAmount').val(totalAmount);
  },

  updateAmountForEverybody: function() {
    var totalAmount = $('#totalAmount').val();

    if (totalAmount > 0) {
      var sharedAmount = totalAmount / (this.subtransactions.length);

      _.each(this.subtransactions, function(friend) {
        friend.amount = sharedAmount;
      });
    }
  },

  afterRender: function() {
    var self = this;
    this.$el.html(this.template());

    $("#friends").autocomplete({
      source: function(request, response) {
        facebook.getFriends(function(friends) {

          res = $.map(friends, function(friend) {
            if (friend.name.toLowerCase().indexOf(request.term.toLowerCase()) >= 0) {
              return {
                label: friend.name,
                borrowerId: parseInt(friend.id, 10)
              };
            }
          });
          response(res);

        });
      },
      appendTo: $(self.el),
      minLength: 1,
      delay: 0,
      select: function(event, ui) {
        self.addToList(event, ui);
        $(this).val('');
        return false;
      },
      close: function(event, ui) {}
    });

    $("#friends").data("autocomplete")._renderItem = function(ul, item) {
      var image_url = "http://graph.facebook.com/" + item.borrowerId + "/picture";
      return $('<li></li>').data("item.autocomplete", item).append($("<img>").attr('src', image_url)).append('<a>' + item.value + '</a>').appendTo(ul);
    };
    return this;
  }
});