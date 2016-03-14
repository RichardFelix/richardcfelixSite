const gulp = require('gulp'),
      path = require('path'),
      $ = require('gulp-load-plugins')();

////////////////////////////////////////////
//             Configuration              //
////////////////////////////////////////////
const config = {
    styles: {
        src: ['public/sass/style.scss'],
        srcDir: 'public/sass/*.scss',
        dest: 'public/css/'
    },
    scripts: {
        src: ['public/js/**/*.js', 'app.js'],
        bundle: 'custom.js',
        dest: 'public/js/',
    },
    jade:{
      src: 'views/index.jade',
      srcDir: 'views/**/*.jade',
      dest: 'views/html/'
    },
    img:{
      srcDir: 'public/img/preBuild/*.jpg',
      dest: 'public/img/'
    },
    html:{
      srcDir: 'views/html/*.html',
      dest: 'views/html/'
    },
    less:{
      src: ['public/less/style.less'],
      srcDir: 'public/less/*.less',
      dest: 'public/less/',
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
  return gulp.src(config.styles.srcDir)
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
//                                                            Miscellaneous                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////
//              Less Compiling            //
////////////////////////////////////////////
gulp.task('dev:less', lessCompile);   // hoisted function this is why this works

function lessCompile(){
    return gulp
        .src(config.less.src)
        .pipe($.sourcemaps.init())
        .pipe($.less({
          paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.styles.dest));
};

/////////////////////////////////
//    Jade to HTML Compiling   //
/////////////////////////////////
gulp.task('jade', ()=>{
  return gulp.src(config.jade.src)
      .pipe($.jade({
        pretty: true
      }))
      .pipe(gulp.dest(config.jade.dest))
});

///////////////////////
//    HTML5 Linting  //
///////////////////////
gulp.task('dev:html', ()=>{
    return gulp.src(config.html.scrDir)
        .pipe($.html5Lint());
});

//////////////////////////////////////////////////////
//    Static Web File Watching w/ Live Reloading    //
//////////////////////////////////////////////////////
const browserSync = require('browser-sync').create(),
      reload      = browserSync.reload;

gulp.task('dev:serve', ()=>{

    browserSync.init({
      server: {
        baseDir: config.html.dest
      }
    });

    gulp.watch(config.html.srcDir).on("change", reload);
});
