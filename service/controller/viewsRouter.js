'use strict';
(function(module){	
	var deploy = function(app, router, resource, data){
		/*
		router.get(/page\/\w+/, function (req, res) {
			var viewUrl = req.url.substring(1,req.url.length);
			console.log(viewUrl);
			res.status(200).send('page');
		});*/
		router.get(/\/test\w+/, function (req, res) {
			var viewUrl = req.url.substring(1,req.url.length);
			console.log(viewUrl);
			res.status(200).send('page');
		});

		app.use('/page', router);
		
		/*
		app.get(/\w+\.html$/, function (req, res) {
			var viewUrl = req.url.substring(1,req.url.length);
			var fs = require('fs');
			var path = require('path');

			var filePath = path.resolve(__dirname, '../views/'+viewUrl);
			console.log(viewUrl);
			fs.exists(filePath, function (exists) {
				//這裡需要檢查檔案存在與否
				if(exists){
					res.status(200);
					res.render(viewUrl, { title : '測試'});	
				}else{
					var htmlPath = path.resolve(__dirname, '../views/404.html');
					res.render(htmlPath, { message : 'not fount page', status : '404'});					
					res.status(404);
				}
			});
		});*/		
	};
	
	module.exports = {
		deploy : deploy
	};
})(module);