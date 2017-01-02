/**
 * Created by Administrator on 2016/12/31.
 */

/*������������*/
var gulp = require('gulp');
var rev = require('gulp-rev');/*��ÿ���ļ���Ӱ汾�ţ��޸��ļ����Ӷ�������ʾɵĻ���*/
var revReplace = require('gulp-rev-replace');/*����index�������*/
var useref = require('gulp-useref');/*�ϲ�js��css�ļ�*/
var filter = require('gulp-filter');/*ɸѡ��restore*/
var uglify = require('gulp-uglify');/*ѹ��js����*/
var csso = require('gulp-csso');/*ѹ��css*/

/*���ò������*/
gulp.task('default',function(){
    var jsFilter = filter('**/*.js',{restore: true});
    var cssFilter = filter('**/*.css',{restore: true});
    var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore: true});

    return gulp.src('src/index.html')
        .pipe(useref())/*��һ���ɽ����д���ע�͵�js��css�ļ��ӽ���*/
        .pipe(jsFilter)/*��js�ļ�ɸѡ����*/
        .pipe(uglify())/*jsѹ��*/
        .pipe(jsFilter.restore)/*ѹ�����js���ӻ�����*/
        .pipe(cssFilter)/*ɸѡcss�ļ�*/
        .pipe(csso())/*ѹ��css*/
        .pipe(cssFilter.restore)/*���ӻ�ȥ*/
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});