'use strict';
(function(module){	
	var initialize = function(app, path, resource, data){

		app.get(/\w+\.html$/, function (req, res) {
			var viewUrl = req.url.substring(1,req.url.length);
			res.render(viewUrl, { title : '測試'});
		});
	};
	
	module.exports = {
		initialize : initialize
	};
})(module);