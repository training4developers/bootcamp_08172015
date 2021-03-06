define(["backbone"], function(Backbone) {

	function customSync(method, model, options) {
		if (!options) {
			options = {};
		}
		options.beforeSend = function(xhr) {
			// set custom header
			xhr.setRequestHeader("X-Custom-Header", "Test Value");
		};
		Backbone.sync.call(this, method, model, options)
			.then(function(data, status, xhr) {
				// get custom header
				var headerValue = xhr.getResponseHeader("X-Custom-Header");
				console.log(headerValue);
			});
	}

	return Backbone.Model.extend({
		sync: customSync,
		idAttribute: "_id",
		urlRoot: "/api/userFiles",

		defaults: {
			name: undefined,
			sizeinBytes: undefined,
			uploaded: undefined,
			description: undefined
		},

		getDownloadUrl: function() {
			return "";
		}

	});

});
