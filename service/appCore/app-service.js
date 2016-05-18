//-------------------------
// nodejs app service 配置
//-------------------------
'use strict';
(function(module){
  //const https       = require('https');
  const express       = require('express');                       //web 框架
  const app           = express();
  const session       = require("express-session");               // session store for memory
  const RedisStore    = require('connect-redis')(session);        // session 持久化 (用redis做到LBS共享)
  const swig          = require('swig');                          // 樣板引擎
  const bodyParser    = require('body-parser');                   //
  const cookieParser  = require('cookie-parser');                 // cookie解析模組
  const path          = require('path');                          // 路徑解析模組
  const project       = require('../config/projectInfo.json');    // 載入環境屬性檔案
  const {version, port, redis, secret, viewType, resource} = project;                 // es2015 物件解構，object destructuring with primitives 需要nodejs 6.
  const viewsRouter   = require('../controller/viewsRouter.js');  // 處理 html 的 router.
  const apiRouter     = require('../controller/apiRouter.js');    // 處理 API  的 router.

  
  /* use https example
  var fs = require('fs');
  var options = {
    key: fs.readFileSync('E:/ssl/myserver.key'),
    cert: fs.readFileSync('E:/ssl/myserver.crt'),
    passphrase: '1234'
  };
  var server = null;
  */


  /**
   * description : 設置 express 會用到的中介軟體。
   * note: 注意 先push入的會先執行。
   */
  const deployMiddleware = function(){
      app.use( express.static( path.resolve(__dirname, '../../web/dist/'+version+'/'))); //設定靜態資源路徑
      app.use(cookieParser());                                                           //解析cookie
      app.use(session({                                                                  //session支援與session持久化與共享
        saveUninitialized: true,
        resave: false,
        store: new RedisStore({host:redis.host,port:redis.port}),
        secret: secret                                                                   //加密用字串
      }));
  };


  /**
   * 設置  view engine
   *
   */
  const deployViewEngine = function(){
    var views_path  = path.resolve(__dirname, '../views');
    app.engine('html', swig.renderFile);  
    app.set('view engine', 'html');
    app.set('views', views_path);         //設定views所在路徑
    app.set('view cache', false);         // Swig will cache templates for you, but you can disable
    swig.setDefaults({ cache: false });   // To disable Swig's cache, do the following:
  };

  /**
   * 配置Router
   *
   */
  const deployRouterHandler = function(){
    apiRouter.initialize(app);                  //處理 API
    viewsRouter.initialize(app, express, viewType, resource).deploy();
  };

  //
  const listen = function(){
    app.listen(port);
    /* https
    server = https.createServer(options, app);
    server.listen(port);
    */
    console.log('Application Started on http://localhost:'+port+'/');
  };

  //start app server
  const start = function(){
      deployMiddleware();
      deployViewEngine();
      deployRouterHandler();   
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