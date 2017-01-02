/**
 * Created by Administrator on 2016/12/31.
 */

/*引入所有依赖*/
var gulp = require('gulp');
var rev = require('gulp-rev');/*给每个文件添加版本号，修改文件名从而不会访问旧的缓存*/
var revReplace = require('gulp-rev-replace');/*更新index里的引用*/
var useref = require('gulp-useref');/*合并js和css文件*/
var filter = require('gulp-filter');/*筛选，restore*/
var uglify = require('gulp-uglify');/*压缩js代码*/
var csso = require('gulp-csso');/*压缩css*/

/*调用插件方法*/
gulp.task('default',function(){
    var jsFilter = filter('**/*.js',{restore: true});
    var cssFilter = filter('**/*.css',{restore: true});
    var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore: true});

    return gulp.src('src/index.html')
        .pipe(useref())/*这一步可将所有带有注释的js和css文件扔进来*/
        .pipe(jsFilter)/*把js文件筛选出来*/
        .pipe(uglify())/*js压缩*/
        .pipe(jsFilter.restore)/*压缩完的js再扔回流里*/
        .pipe(cssFilter)/*筛选css文件*/
        .pipe(csso())/*压缩css*/
        .pipe(cssFilter.restore)/*再扔回去*/
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});