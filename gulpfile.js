const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');

gulp.task('doc', function (cb) {
  gulp.src(['README.md', './src/**/*.js'], {read: false})
    .pipe(jsdoc(cb));
});