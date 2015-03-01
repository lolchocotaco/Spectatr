/*
 * gulpfile.js
 *  Gulp task runner configuration and definitions
 *
 *  Type 'gulp' to see a list (and maybe even a small description) of each task
 *  available to you.
 *
 */

// Included plugins
var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  nodemon = require('gulp-nodemon'),
  gutil = require('gulp-util'),
  del = require('del'),
  envify = require('envify/custom'),
  path = require('path'),
  browserify = require('browserify'),
  reactify = require('reactify'),
  source = require('vinyl-source-stream'),
  server = require('./server'),
  isDebug = (process.env.NODE_ENV !== 'production'),
  vendorLibs = [
    'react/addons',
    'react-bootstrap',
    'async',
    'domready',
    'request',
    'masonry-layout'
  ];

var api_endpoint = 'http://localhost:8080/'
if (!isDebug) {
  api_endpoint = 'spectatr.herokuapp.com/';
}
console.log(api_endpoint);

var reactifyES6 = function (file) {
  return reactify(file, {harmony: true});
};

gulp.task('dev', ['watch', 'build', 'server']);
gulp.task('build', ['vendor-js', 'app']);

gulp.task('clean', function () {
  del([
    './public/build/**/*.js',
    './public/build/**/*.css'
  ]);
});

gulp.task('vendor-js', function () {
  return browserify({debug:isDebug})
    .transform(reactifyES6)
    .require(vendorLibs)
    .bundle()
    .on('error', logAndEndStream)
    .pipe(source('vendor.js'))
    .pipe(gulp.dest('public/build/js'));
});


gulp.task('app', function () {
  return browserify({
    entries: ['./app/App.js'],
    debug: isDebug
  }).transform(reactifyES6)
    .transform(envify({API_ENDPOINT: api_endpoint}))
    .external(vendorLibs)
    .bundle()
    .on('error', logAndEndStream)
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/build/js'))
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

  nodemon({ script: 'server.js', ext: 'html js', env : { 'NODE_ENV': 'development' } })
   .on('restart', function () {
   });
});

function logAndEndStream(err) {
  gutil.log(err.stack);
  this.end();
}
