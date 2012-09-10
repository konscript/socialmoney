// load template async
_.extend(Backbone.View.prototype, {
	loadTemplate: function(templateName, callback) {
		var self = this;
		templateName = _.isUndefined(templateName) ? this.name : templateName;
		this.loadedTemplates = this.loadedTemplates || [];

		if (!this.loadedTemplates[templateName]) {

			// add css class
			$(this.el).addClass('template-'+templateName);

			$.get("/js/templates/" + templateName + ".html", function(data) {
				console.log("Ajax: Template " + templateName + " loaded");

				self.loadedTemplates[templateName] = _.template(data);

				if (callback) {
					callback(self.loadedTemplates[templateName]);
				}

				// start afterRender if current template is base template for view
				if (self.name == templateName && self.afterRender) {
					self.template = self.loadedTemplates[templateName];
					self.afterRender();
				}

			});
		} else {
			//console.log("Cache: Template " + templateName + " loaded");
			if (callback) {
				callback(this.loadedTemplates[templateName]);
			}

			// start afterRender if current template is base template for view
			if (self.name == templateName && self.afterRender) {
				self.template = this.loadedTemplates[templateName];
				self.afterRender();
			}
		}
	}
});

// add events
_.extend(Backbone.View.prototype, Backbone.Events);

var models = {};
var collections = {};
var views = {};