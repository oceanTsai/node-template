var app = require('express')();
var swig = require('swig');
var path = require("path");
var people;
console.log('excute test.js');
/**----------------------------------------------
 *
 *	 __dirname   絕對路徑，目前檔案所在資料夾路徑。
 *   __filename  絕對路徑，目前檔案路徑。
 *
 *----------------------------------------------*/
console.log('--------------------');
console.log(__dirname);
console.log(__filename);
console.log(path.normalize(__dirname+path.sep+'..'));
console.log(path.resolve('\service\\views'));
console.log(path.sep);
console.log(path.dirname(__dirname));
console.log(path.dirname(__dirname)+path.sep+'views');
console.log('--------------------');

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
  res.render('test', { title : '測試'});
});

app.get('/test', function (req, res) {
  res.render('test', { title : '測試'});
});

app.listen(1337);
console.log('Application Started on http://localhost:1337/');