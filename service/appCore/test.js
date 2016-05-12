//-------------------------
// 單核 service 測試
//-------------------------
//node ./service/appCore/test.js
console.log('==============================================');
console.log(' service  run');
console.log('==============================================');
const express = require('express');
const app  = express();
const swig = require('swig');
const path = require("path");
//const fs = require('fs');              //檔案讀取

//const project = JSON.parse(fs.readFileSync('./service/config/projectInfo.json', 'utf8').toString());
const project = require( "../config/projectInfo.json" );

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
console.log('path'										  );
console.log('--------------------------------------------');
console.log(__dirname);
console.log(__filename);
//path method test
//console.log(path.sep);											// window 為 \ linux 為/
//console.log(path.normalize('/Users/xxx/otp/demo.js'));    		// \Users\xxx\otp\demo.js
//console.log(path.dirname('/Users/xxx/otp/demo.js'));				// /Users/xxx/otp
//console.log(path.basename('/Users/xxx/otp/demo.js'));				// demo.js
//console.log(path.extname('/Users/xxx/otp/demo.js'));				// .js
//console.log(path.resolve('/Users/xxx/otp/demo.js', '../../'));	//\Users\xxx   以__dirname為主，作相對路徑解析
var res_url 	= path.resolve(__dirname, '../../web/dist/'+version+'/');
var views_path	= path.resolve(__dirname, '../views/test');

//設定靜態資源所在路徑  (如資源移到nginx或是aws s3則此處註解掉)
app.use(express.static(res_url));

// This is where all the magic happens!
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', views_path);	//設定views所在路徑


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