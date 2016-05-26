'use strict';

var _ = require('./'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    mocha = require('gulp-mocha'),
    mergeStream = require('merge-stream'),
    lsConfigs = require('ls-default-configs');

gulp.task('default', _.noop);

gulp.task('test', ['lint', 'mocha']);

gulp.task('mocha', ['lint'], function() {
    return gulp.src(['test/*.js'], {read: false})
        .pipe(mocha());
});

gulp.task('lint', function() {
    var testLint = gulp.src(['test/*.js'])
            .pipe(jshint(lsConfigs.jshintrcTestDir))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'))
            .pipe(jscs(lsConfigs.jscsrc)),

        otherLint = gulp.src(['./*.js', 'lib/*.js'])
            .pipe(jshint(lsConfigs.jshintrc))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'))
            .pipe(jscs(lsConfigs.jscsrc));

    return mergeStream(testLint, otherLint);
});
