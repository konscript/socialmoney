var friends = [];

var addToList = function(event, ui) {
  var userid = ui.item.userid;
  var username = ui.item.label;

  // list
  friends.push({
    userid: userid
  });

  // UI
  var elm = $('<p/>', {
    text: username,
    'class': 'friend'
  }).appendTo('#resultList');

  $('<input/>', {
    type: 'text'
  }).bind('keyup', function(e) {
    updateAmount(this, userid);
  }).appendTo(elm);

  $('<span/>', {
    text: 'X',
    'class': 'delete'
  }).bind('click', function(e) {
    removeFromList(this, userid);
  }).appendTo(elm);

  // update amount for all friends
  updateAmountForEverybody($('#totalAmount'));

};

var removeFromList = function(deleteElm, userid) {
  var container = $(deleteElm).parent('p');

  // list
  friends.filter(function(friend, i) {
    if (friend.userid === userid) {
      friends.remove(i);
    }
  });

  //UI
  $(container).remove();

  updateTotalAmount();
};

var updateAmount = function(amountElm, userid) {
  var amount = $(amountElm).val();

  // list
  friends.filter(function(friend) {
    if (friend.userid === userid) {
      friend.amount = amount;
    }
  });

  updateTotalAmount();
};

var updateTotalAmount = function(){
  var totalAmount = 0;
  $('.friend input').each(function(elm, i) {
      totalAmount += parseInt(this.value, 10);
  });

  // update total amount
  $('#totalAmount').val(totalAmount);
};

var updateAmountForEverybody = function(totalAmountElm){
  var totalAmount = $(totalAmountElm).val();

  if (totalAmount > 0) {
    var amount = totalAmount / (friends.length);
    $('.friend input').val(amount);
  }
};

$(function() {

  // events
  $('#totalAmount').bind('keyup', function(e) {
    updateAmountForEverybody(this);
  });

  // jquery ui
  $("#friendPicker input").autocomplete({
    // https://graph.facebook.com/me/friends?access_token=
    source: "data.js",
    select: function(event, ui) {
      addToList(event, ui);
    },
    close: function(event, ui){
      $(this).val('');
    }
  });
});

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};