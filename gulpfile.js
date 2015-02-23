/*
 * gulpfile.js
 *  Gulp task runner configuration and definitions
 *
 *  Type 'gulp' to see a list (and maybe even a small description) of each task
 *  available to you.
 *
 */

// Included plugins
var argv = require('yargs').argv;
var nodemon = require('gulp-nodemon');
var bump = require('gulp-bump');

var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  gutil = require('gulp-util'),
  del = require('del'),
  path = require('path'),
  browserify = require('browserify'),
  reactify = require('reactify'),
  source = require('vinyl-source-stream'),
  vendorLibs = Object.keys(require('./package').dependencies),
  server = require('./server'),
  isDebug = (process.env.NODE_ENV !== 'production');

/*
 * Update semver version numbers (ver: Major.Minor.Patch.Pre)
 */
gulp.task('bump-major', function(){
  gulp.src(['./package.json'])
  .pipe(bump({type:'major'}))
  .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function(){
  gulp.src(['./package.json'])
  .pipe(bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});

gulp.task('bump-patch', function(){
  gulp.src(['./package.json'])
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});

gulp.task('bump-pre', function(){
  gulp.src(['./package.json'])
  .pipe(bump({type:'prerelease'}))
  .pipe(gulp.dest('./'));
});



// exclude server-side packages
vendorLibs = vendorLibs.filter(function (lib) {
  var excluded = ['express','express-session'],
    isExcluded = (excluded.indexOf(lib) > -1);
  return !isExcluded;
});

var reactifyES6 = function (file) {
  return reactify(file, {harmony: true});
};

gulp.task('dev', ['watch', 'build', 'server']);
gulp.task('build', ['vendor-js', 'app']);

gulp.task('clean', function () {
  del([
    './build/**/*.js',
    './build/**/*.css'
  ]);
});


gulp.task('vendor-js', function () {
  return browserify()
    .transform(reactifyES6)
    .require(vendorLibs)
    .bundle({debug:isDebug})
    .on('error', logAndEndStream)
    .pipe(source('vendor.js'))
    .pipe(gulp.dest('build/js'));
});


gulp.task('app', function () {
  return browserify({
    entries: ['./app/App.js']
  }).transform(reactifyES6)
    .bundle({debug: isDebug})
    .on('error', logAndEndStream)
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(livereload({auto: false}));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch([
    './app/components/**/*.js',
    './app/services/**/*.js',
    './app/App.js'
  ], ['app']);
});


gulp.task('server', function () {
  server.listen(8080, function () {
    gutil.log('Server listening on http://localhost:8080');
  });
});
function logAndEndStream(err) {
  gutil.log(err.stack);
  this.end();
}

