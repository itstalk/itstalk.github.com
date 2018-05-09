var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var gulpCopy = require('gulp-copy');
var connect = require( 'gulp-connect' );
var livereload = require('gulp-livereload');

gulp.task('css', function(){
  return gulp.src([
    "src/assets/plugins/bootstrap/css/bootstrap.min.css",
    "src/assets/plugins/font-awesome/css/font-awesome.min.css",
    "src/assets/css/animate.min.css",
    "src/assets/css/style.css",
    "src/assets/css/style-responsive.css",
    "src/assets/css/red.css"
    ])
  .pipe(concat('itstalk.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('assets/css'))
  .pipe(connect.reload());
});

gulp.task('js', function(){
  return gulp.src([
    "src/assets/plugins/jquery/jquery-1.9.1.min.js",
    "src/assets/js/apps.js"
    ])
  .pipe(sourcemaps.init())
  .pipe(concat('itstalk.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('assets/js'))
  .pipe(connect.reload());
});

gulp.task('copy', function () {
  return gulp.src(['src/assets/img/*', 'src/assets/img/*/*'])
  .pipe(gulp.dest('assets/img'));
});

gulp.task('font', function () {
  return gulp.src(['src/assets/plugins/font-awesome/fonts/*'])
  .pipe(gulp.dest('assets/fonts'));
});


gulp.task( 'connect', function() {
  connect.server({ root: 'public',  livereload: true });
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('.'))
  .pipe(connect.reload());
});


gulp.task('watch', function () {
  gulp.watch(['src/index.html'], ['html']);
  //gulp.watch(['src/assets/js/*.js'], ['js']);
  gulp.watch(['src/assets/css/*.css'], ['css']);
});

gulp.task('default', [ 'connect', 'html', 'css', 'js', 'font', 'copy', 'watch']);