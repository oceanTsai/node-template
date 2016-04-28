//node ./service/appCore/test.js
console.log('==============================================');
console.log(' service  run');
console.log('==============================================');
const express = require('express');
const app  = express();
const swig = require('swig');
const path = require("path");
const fs = require('fs');              //檔案讀取

const project = JSON.parse(fs.readFileSync('./service/config/projectInfo.json', 'utf8').toString());
const version = project.version;
const host = project.host;
const resource = project.resource;

console.log('--------------------------------------------');
console.log('info');
console.log('--------------------------------------------');
console.log("version  : " +version);
console.log("host     : " + host);
console.log("resource : " + resource);
console.log('');

/**----------------------------------------------
 *
 *	 __dirname   絕對路徑，目前檔案所在資料夾路徑。
 *   __filename  絕對路徑，目前檔案路徑。
 *
 *----------------------------------------------*/
console.log('--------------------------------------------');
console.log('path');
console.log('--------------------------------------------');
console.log(__dirname);
console.log(__filename);
console.log(path.normalize(__dirname+path.sep+'..'));
console.log(path.resolve('\service\\views'));
console.log(path.sep);
console.log(path.dirname(__dirname));
console.log(path.dirname(__dirname)+path.sep+'views');
console.log('');


var res_url = path.normalize(__dirname+path.sep+'..'+path.sep+'..')+path.sep+'web'+path.sep+'dist'+path.sep+version+path.sep;
console.log('--------------------------------------------');
console.log("resource path");
console.log('--------------------------------------------');
console.log(res_url);
console.log('');

//靜態資源
app.use(express.static(res_url));

// This is where all the magic happens!
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.dirname(__dirname)+path.sep+'views'+path.sep+'test');	//設定views所在路徑


// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

app.get('/', function (req, res) {
  res.render('test', { title : '測試', host: host, resource : resource});
});

app.get('/test', function (req, res) {
  res.render('test', { title : '測試', host : host, resource : resource});
});

app.listen(1337);
console.log('Application Started on http://localhost:1337/');