/*
 * gulpfile.js
 *  Gulp task runner configuration and definitions
 *
 *  Type 'gulp' to see a list (and maybe even a small description) of each task
 *  available to you.
 *
 */

// Included plugins
var gulp =  require('gulp');
var argv = require('yargs').argv;
var nodemon = require('gulp-nodemon');
var bump = require('gulp-bump');

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
