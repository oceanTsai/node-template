//--------------------------------------------------------------
// gulp info          列出專案資訊
// gulp production    切換成正式機環境
// gulp test          切換成測試機環境
// gulp dev           切換成開發環境
// gulp 
//
//--------------------------------------------------------------

const gulp        = require('gulp');            //工作管理
const gutil       = require('gulp-util');       //
const fs          = require('fs');              //檔案讀取
const del         = require('del');             //檔案刪除
const babel       = require('gulp-babel');      //babel   轉譯
const coffee      = require('gulp-coffee');     //coffee  轉譯
const sass        = require('gulp-sass');       //sass    轉譯
const concat      = require('gulp-concat');     //合併檔案
const rename      = require('gulp-rename');     //更名工具
const uglify      = require('gulp-uglify');     //壓縮js工具
const cssnano     = require('gulp-cssnano');    //壓縮css工具
const browserify  = require('gulp-browserify'); //js模組化載入工具
const jeditor     = require('gulp-json-editor');//json檔案編輯

//const versionRegex = /^version=(\S+)/m;
//const version = fs.readFileSync('./service/config/project.json', 'utf8').toString().match(versionRegex)[1];
//console.log(process.argv);
const project = JSON.parse(fs.readFileSync('./service/config/projectInfo.json', 'utf8').toString());
const version = project.version;

const path = {};
 path.parent      = './service';
 path.webResource = './service/webResource';
 path.dist        = './web/dist';
 path.js          = './web/dist/'+ version +'/js';
 path.css         = './web/dist/'+ version +'/css';
 
//------------------------
// print project
//------------------------
gulp.task('info',function(){
  console.log("--------------------------");
  console.log("-  Project information   -");
  console.log("--------------------------");
  for(var key in project){
    console.log(key + " : " + project[key]);
  }
});


//------------------------
// 運行環境切換
//------------------------
const ENV = {
  PRODUCTION  : 'projection',
  TEST        : 'test',
  DEVLOPERS   : 'devlopers'
};

var changProjectInfo = function(env){
  return gulp.src('./service/config/projectInfo.json')
             .pipe(jeditor({'environment': env}))
             .pipe(gulp.dest('./service/config/'));
};
var changedEnv = function(env){
  return gulp.src('./service/configTmp/'+ env +'/*.json')
             .pipe(gulp.dest('./service/config/'));
};

//Change to the production environment
gulp.task('production', function() {
  console.log('-----------------------------------');
  console.log('-     change to the production    -');
  console.log('-----------------------------------');
  changProjectInfo(ENV.PRODUCTION);
  return changedEnv(ENV.PRODUCTION);
});

//Change to the test environment
gulp.task('test', function() {
  console.log('-----------------------------------');
  console.log('-     change to the test          -');
  console.log('-----------------------------------');
  changProjectInfo(ENV.TEST);
  return changedEnv(ENV.TEST);
});

//Change to the devlopers environment
gulp.task('dev', function() {
  console.log('-----------------------------------');
  console.log('-     change to the devlopers     -');
  console.log('-----------------------------------');
  changProjectInfo(ENV.DEVLOPERS);
  return changedEnv(ENV.DEVLOPERS);
});


//------------------------
// 建置
//------------------------

/**
 * description : merge using require of js
 */
var browserifyTask = function(src, dist, filter, clear){
     //filter : don not clone to distnation folder
     return gulp.src( [src, filter] , {read: false})
                .pipe(browserify({extensions: ['.js']}))
                .pipe(gulp.dest( dist ))
                .on('end',function(){
                     del([clear]);   //測試時可將此註解即可看到temp內容
                });      
};


/**
 * description : clean dist and temp folder
 * CLI : gulp clean
 */
gulp.task('clean', function(){
     del([path.dist+'/**', './web/temp/**/']); 
});


/**
 * description : compile babel
 *
 */
gulp.task('babel', function() {
    return gulp.src('./service/webResource/babel/**/*.js')
                //.pipe(babel({presets: ['es2015']}))
                .pipe(babel())
                .pipe(gulp.dest( './web/temp/babel/' ))
                .on('end', function(){
                  //(src, dist, filter, clear)
                  browserifyTask('./web/temp/babel/**/*.js', path.js + '/babel' , '!./web/temp/babel/common/**/*.js', './web/temp/babel/**/');
               });
});


/**
 * description : compile coffee and merge js (將coffee轉成js並將使用require的js合併)
 * CLI : gulp coffee
 */
gulp.task('coffee',function() {
    return gulp.src('./service/webResource/coffee/**/*.coffee')
               .pipe(coffee({bare: true}).on('error', gutil.log))
               .pipe(gulp.dest( './web/temp/coffee/' ))
               .on('end', function(){
                  browserifyTask('./web/temp/coffee/**/*.js', path.js + '/coffee' , '!./web/temp/coffee/common/**/*.js', './web/temp/coffee/**/');
               }); 
});


/** 
 * description : compile sass and minfly css (將sass轉譯成css並壓縮)
 * CLI : gulp sass
 */
gulp.task('sass', function () {
    return gulp.src( ['./service/webResource/sass/**/*.scss', '!./service/webResource/sass/common/**/*.scss'])
               .pipe(sass().on('error', sass.logError))
               .pipe(cssnano())                         //壓縮css,去除註解
               .pipe(gulp.dest(path.css ));             //輸出資料夾
});


/**
 * description : build web Resource (建置前端資源)
 * CLI : gulp build
 */
gulp.task('build', ['sass', 'coffee', 'babel'], function(){
  //
});


/**
 * description : default action (預設動作)
 * CLI : gulp
 */
gulp.task('default',['build'],function(){
  //
});