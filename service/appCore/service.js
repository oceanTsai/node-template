'use strict';
const cluster   = require('cluster');              //nodejs 多核心應用系統  multi-core systems
const cpus      = require('os').cpus().length;     //系統核心數
if (cluster.isMaster) {
  //啟動一個worker
  for (var i=0; i < cpus; i++) {
    cluster.fork();
  }
  
  cluster.on('listening',function(worker, address){
    console.log('worker ' + worker.process.pid +', listen: '+address.address+":"+address.port);
  });
  
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ${worker.process.pid} died');
    //重啟一個worker. In case a worker dies, a new one should be started.
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  var app = require('./app');
      app.start();
}