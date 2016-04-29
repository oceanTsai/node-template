'use strict';
(function(module){
  const express     = require('express');
  const app         = express();
  const swig        = require('swig');
  const path        = require('path');
  const project     = require('../config/projectInfo.json');
  const version     = project.version;
  const port        = project.port;
  const viewsRouter = require('../controller/viewsRouter.js');

  //設定靜態資源路徑
  var deployResource = function(){
    var res_url     = path.resolve(__dirname, '../../web/dist/'+version+'/');
    app.use(express.static(res_url));
    console.log(res_url);
  };

  //
  var deployViewEngine = function(){
    var views_path  = path.resolve(__dirname, '../views');
      console.log(views_path);
    app.engine('html', swig.renderFile);  
    app.set('view engine', 'html');
    app.set('views', views_path);         //設定views所在路徑
    app.set('view cache', false);         // Swig will cache templates for you, but you can disable
    swig.setDefaults({ cache: false });   // To disable Swig's cache, do the following:
  };

  //
  var deplayRouterHandler = function(app){
    viewsRouter.initialize(app);
  };

  //
  var listen = function(){
    app.listen(port);
    console.log('Application Started on http://localhost:'+port+'/');
  };

  //start app server
  var start = function(){
    deployResource();
    deployViewEngine();
    deplayRouterHandler(app);
    listen();
  };
    
  module.exports = {
    start : start
  };
})(module);