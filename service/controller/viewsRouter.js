'use strict';
(function(module){	
	var initialize = function(app, path, resource, data){

		app.get(/\w+\.html$/, function (req, res) {
			var viewUrl = req.url.substring(1,req.url.length);
			var fs = require('fs');
			var path = require('path');
			var filePath = path.resolve(__dirname, '../views/'+viewUrl);
			console.log(filePath);
			fs.exists(filePath, function (exists) {
				//這裡需要檢查檔案存在與否
				//console.log(exists);
				if(exists){
					res.status(200);
					res.render(viewUrl, { title : '測試'});	
				}else{
					res.status(404);
					res.render('404.html', { message : 'not fount page', status : '404'});
				}
			});
		});

		app.use(function(err, req, res, next){
			console.log('----------------');
			//發生例外
		  //res.status(500).send({ error: 'Something failed!' });   
		  //res.sendStatus(500); // 等于 res.status(500).send('500') 
    });
		
	};
	
	module.exports = {
		initialize : initialize
	};
})(module);