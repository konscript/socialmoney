// load template async
_.extend(Backbone.View.prototype, {
  loadTemplate: function(templateName) {
    var self = this;
    templateName = _.isUndefined(templateName) ? this.id : templateName;

    $.get("/js/templates/"+templateName+".html", function(data) {
      self.template = _.template(data);
      self.trigger("templateLoaded");
    });
  }
});

// add events
_.extend(Backbone.View.prototype, Backbone.Events);

var models = {};
var collections = {};
var views = {};