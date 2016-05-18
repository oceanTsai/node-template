'use strict';
(function(module){
	var view,app,express,resource;

	/**
	 * 路徑解析
	 */
	var pathPase = function(url){
		var viewURL  =  url.substring(1,url.length);
		var path     =  require('path');
		var page     =  (viewURL) ? (path.resolve(__dirname, '../views/'+ viewURL) + '.html' ): (path.resolve(__dirname, '../views/index') + '.html');
		var page_404 =  path.resolve(__dirname, '../views/404.html');
		return {
			viewURL  : viewURL,
			page     : page,
			page_404 : page_404		
		}
	};

	/**
	 * 渲染代理
	 */
	var renderProxy = function(req, res, existHandler, notFoundHandler){
		var {viewURL, page, page_404} = pathPase(req.url);
		var fs = require('fs');
		fs.exists(page, function (exists) {
			(exists) ? existHandler(req, res, page) : notFoundHandler(req, res, page_404) ;
		});
	};

	/**
	 * root
	 */
	var deployRoot = function(app, router){
		// /\/\w+/
		// /^\/\w+$/
		router.get(/^[A-Za-z0-9_/]+$/,function(req,res){
			renderProxy(req, res,
				//檔案存在
				function(req, res, page){
					res.status(200);
					res.render(page, { title : '入口首頁', resource : resource});	
				},
				//檔案不存在
				function(req, res, page){
					res.render(page, { message : 'not fount page', status : '404'});					
					res.status(404);
				}
			);
		});
		app.use('/', router);
	};

	/**
	 * test
	 */
	var depolyTest = function(app, router){
		router.get(/^[A-Za-z0-9_/]+$/, function (req, res) {
			renderProxy(req, res,
				//檔案存在
				function(req, res, page){
					res.status(200);
					res.render(page, { title : '測試頁面',  resource : resource});	
				},
				//檔案不存在
				function(req, res, page){
					res.render(page, { message : 'not fount page', status : '404'});					
					res.status(404);
				}
			);
		});
		app.use('/test', router);
	};

	/**
	 * 配置 view Router
	 */
	var deploy = function(data){
		//先後順序很重要，中介層是先加入的先觸發
		depolyTest(app, express.Router());
		deployRoot(app, express.Router());
	};


	var initialize = function(...args){
		app = args[0];
		express = args[1];
		view = args[2];
		resource = args[3];
		return this;
	};
	
	module.exports = {
		initialize : initialize,
		deploy : deploy
	};
})(module);