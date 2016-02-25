var gulp = require('gulp'),
    path = require('path'),
    $ = require('gulp-load-plugins')();

////////////////////////////////////////////
//             Configuration              //
////////////////////////////////////////////
const config = {
    styles: {
        src: ['public/sass/style.scss'],
        dest: 'public/css/',
        srcDir: 'public/sass/*.scss'
    },
    scripts: {
        src: ['public/js/*.js'],
        dest: 'public/js/',
        bundle: 'custom.js'
    }
}

////////////////////////////////////////////
//             Development                //
////////////////////////////////////////////
gulp.task('dev:sass', ()=>{
  return gulp
    .src(config.styles.src)
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('dev:lint', ()=>{
  return gulp
    .src(config.scripts.src)
    .pipe($.cached('linting'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
});

gulp.task('dev',
  gulp.parallel(
    'dev:sass',
    'dev:lint'
));

gulp.task('dev:watch', gulp.series('dev', devWatch));

function devWatch(){
  gulp.watch(config.styles.srcDir, gulp.series('dev:sass'));
  gulp.watch(config.scripts.src, gulp.series('dev:lint'));
}

gulp.task('default', gulp.series('dev:watch'));

// gulp.task('dev:less', lessCompile);   // hoisted function this is why this works
//
// function lessCompile(){
//     return gulp
//         .src('public/less/style.less')
//         .pipe($.sourcemaps.init())
//         .pipe($.less({
//           paths: [ path.join(__dirname, 'less', 'includes') ]
//         }))
//         .pipe($.sourcemaps.write())
//         .pipe(gulp.dest('public/css/'));
// };


////////////////////////////////////////////
//              Production                //
////////////////////////////////////////////
gulp.task('prod:sass', ()=>{
  return gulp
    .src(config.styles.src)
    .pipe($.sass())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe($.cleanCss())
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('prod:jsMini', ()=>{
  return gulp
    .src(config.scripts.src)
    .pipe($.babel())
    .pipe($.concat(config.scripts.bundle))
    .pipe($.uglify())
    .pipe(gulp.dest(config.scripts.dest))
});

gulp.task('production',          // gulp tasks are not hoisted like functions remmeber that
  gulp.parallel(
    'prod:sass',
    'prod:jsMini'
));
