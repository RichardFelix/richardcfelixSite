var gulp = require('gulp'),
    path = require('path'),
    $ = require('gulp-load-plugins')();

// gulp.task('default', sass);

// SASS

gulp.task('sass', ()=>{
  return gulp
    .src('public/sass/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('sass:watch', () =>{
  gulp.watch('public/sass/*.scss', ['sass']);
});

// LESS

gulp.task('less', lessCompile);

function lessCompile(){
    return gulp
        .src('public/less/style.less')
        .pipe($.sourcemaps.init())
        .pipe($.less({
          paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('public/css/'));
};

// jsHint

gulp.task('lint', function() {
  return gulp
    .src('public/js/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
});
