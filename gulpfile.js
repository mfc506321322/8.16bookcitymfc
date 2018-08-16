//http://dushu.xiaomi.com/#page=main&tab=0
var gulp = require('gulp'),
server = require('gulp-webserver'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
autocss = require('gulp-autoprefixer');
var fs = require('fs'),
path = require('path'),
url = require('url');
var mock = require('./mock/');
gulp.task('sass',function(){
    return gulp.src('./src/scss/*')
    .pipe(sass())
    //.pipe(concat('all.css'))
    .pipe(autocss({
        browsers:['last 2 versions']
    }))
    .pipe(gulp.dest('./src/css'))
})
gulp.task('server',function(){
    return gulp.src('./src/')
    .pipe(server({
        port:8080,
        open:true,
        middleware:function(req,res){
            if(req.url == '/favicon.ico'){
                res.end('');
                return;
            }
            if(/^\/api/.test(req.url)){
                res.end(mock(req.url));
            }else{
                var pathname = url.parse(req.url).pathname;
                pathname = /(\.js|\.css|\.html|\.woff|\.ttf|\.png|\.jpg)$/.test(pathname)?pathname:'index.html';
                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)));
            }
        }
    }))
})
gulp.task('watch',function(){
    return gulp.watch('./src/scss/*',gulp.series('sass'));
});
gulp.task('default',gulp.series('sass',gulp.parallel('server','watch')));