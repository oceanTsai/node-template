'use strict';
(function(module){
  //const https       = require('https');
  const express       = require('express');
  const session       = require("express-session");        //session store for memory
  const RedisStore    = require('connect-redis')(session); //session 持久化
  const app           = express();
  const swig          = require('swig');
  const bodyParser    = require('body-parser');
  const cookieParser  = require('cookie-parser');
  const path          = require('path');
  const project       = require('../config/projectInfo.json');
  const version       = project.version;
  const port          = project.port;
  const redis         = project.redis;
  const secret        = project.secret; //加密cookie用
  //router
  const viewsRouter   = require('../controller/viewsRouter.js');
  const apiRouter     = require('../controller/apiRouter.js');
  /* use https
  var fs = require('fs');
  var options = {
    key: fs.readFileSync('E:/ssl/myserver.key'),
    cert: fs.readFileSync('E:/ssl/myserver.crt'),
    passphrase: '1234'
  };
  var server = null;
  */

  //設定靜態資源路徑
  var deployResource = function(){
    var res_url     = path.resolve(__dirname, '../../web/dist/'+version+'/');
    app.use(express.static(res_url));
  };

  var deployMiddleware = function(){
    console.log(redis.host);
    app.use(cookieParser());
    app.use(session({
      saveUninitialized: true,
      resave: false,
      store: new RedisStore({host:redis.host,port:redis.port}),
      secret: secret                                    //加密用字串
    }));
  };

  //
  var deployViewEngine = function(){
    var views_path  = path.resolve(__dirname, '../views');
    app.engine('html', swig.renderFile);  
    app.set('view engine', 'html');
    app.set('views', views_path);         //設定views所在路徑
    app.set('view cache', false);         // Swig will cache templates for you, but you can disable
    swig.setDefaults({ cache: false });   // To disable Swig's cache, do the following:
  };

  //
  var deplayRouterHandler = function(){
    viewsRouter.initialize(app);
    apiRouter.initialize(app);

  };

  //
  var listen = function(){
    app.listen(port);
    /* https
    server = https.createServer(options, app);
    server.listen(port);
    */
    console.log('Application Started on http://localhost:'+port+'/');
  };

  //start app server
  var start = function(){
      deployResource();
      deployMiddleware();
      deployViewEngine();
      deplayRouterHandler();
      
      /*
      app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
      });*/
      listen();


  };
    
  module.exports = {
    start : start
  };
})(module);