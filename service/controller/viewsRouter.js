'use strict';
(function(module){
	
	var initialize = function(app, resource, data){
		app.get('/', function (req, res) {
			res.render('test/test', { title : '測試'});
		});
	};
	
	module.exports = {
		initialize : initialize
  };
})(module);