var gulp = require('gulp');

var ts = require('gulp-typescript');
var tsConfig = require('./src/tsconfig.json');

var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

var webserver = require('gulp-webserver');

gulp.task('ts', function () {
    var tsResult = gulp.src(['./src/**/*.ts', '!./src/typings'])
        .pipe(ts(tsConfig.compilerOptions))
        .pipe(webpack(webpackConfig));
    
    return tsResult.pipe(gulp.dest('./dist'));
});

gulp.task('html', function () { 
    return gulp.src('./src/**/*.html').pipe(gulp.dest('./dist'));
});

gulp.task('webserver', function () {
    gulp.src('./dist')
        .pipe(
        webserver({
            host: 'localhost',
            livereload: true
        })
    )
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.ts', ['ts']);
    gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('compile', ['ts', 'html']);

gulp.task('default', ['ts', 'html', 'watch', 'webserver']);