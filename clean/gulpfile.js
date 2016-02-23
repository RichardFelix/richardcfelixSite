var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ()=> {
  return gulp
      .src('public/less/*.less')
      .pipe(sourcemaps.init())
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('public/css'));
});
