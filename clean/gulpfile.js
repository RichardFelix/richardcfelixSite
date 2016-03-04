const gulp = require('gulp'),
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
        src: ['public/js/**/*.js', 'app.js'],
        dest: 'public/js/',
        bundle: 'custom.js'
    },
    jade:{
      srcDir: 'views/**/*.jade',
    },
    img:{
      srcDir: 'public/img/preBuild/*.jpg',
      dest: 'public/img/'
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

gulp.task('dev:jadeLint', ()=>{
  return gulp
    .src(config.jade.srcDir)
    .pipe($.pugLint());
});

gulp.task('dev:sassLint', ()=>{
  return gulp.src('public/sass/*.scss')
    .pipe($.scssLint());
});

gulp.task('dev',
  gulp.parallel(
    'dev:sass',
    'dev:lint',
    'dev:jadeLint',
    'dev:sassLint'
));

gulp.task('dev:watch', gulp.series('dev', devWatch));

function devWatch(){
    gulp.watch(config.styles.srcDir, gulp.series('dev:sass'));
    gulp.watch(config.scripts.src, gulp.series('dev:lint'));
    gulp.watch(config.jade.srcDir, gulp.series('dev:jadeLint'));
    gulp.watch(config.styles.srcDir, gulp.series('dev:sassLint'));
}

gulp.task('default', gulp.series('dev:watch'));

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

gulp.task('prod:img', ()=>{
  return gulp.src(config.img.srcDir)
    .pipe($.imagemin({
      optimizationLevel: 5
    }))
    .pipe(gulp.dest(config.img.dest));
});

gulp.task('production',          // gulp tasks are not hoisted like functions remmeber that
  gulp.parallel(
    'prod:sass',
    'prod:jsMini',
    'prod:img'
));



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                            Miscllenous                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////
//              Less Compiling            //
////////////////////////////////////////////
gulp.task('dev:less', lessCompile);   // hoisted function this is why this works

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

/////////////////////////////////
//    Jade to HTML Compiling   //
/////////////////////////////////
gulp.task('jade', ()=>{
  return gulp.src('views/**/*.jade')
      .pipe($.jade({
        pretty: true
      }))
      .pipe(gulp.dest('views/html/'))
});

//////////////////////////////////////////////////////
//    Static Web File Watching w/ Live Reloading    //
//////////////////////////////////////////////////////
const browserSync = require('browser-sync').create(),
      reload      = browserSync.reload;

gulp.task('serve', ()=>{

    browserSync.init({
      server: {
        baseDir: "views/html/"
      }
    });

    gulp.watch("views/html/*.html").on("change", reload);
});

///////////////////////
//    HTML5 Linting  //
///////////////////////
gulp.task('html', ()=>{
    return gulp.src('views/html/*.html')
        .pipe($.html5Lint());
});
