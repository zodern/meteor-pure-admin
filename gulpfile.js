var gulp = require('gulp');
var child = require('child_process');

gulp.task('build-client', function() {
  child.exec('./node_modules/meteor-build-client/main.js ../output', function (err, result) {
    console.log(err);
    console.log(result);
  });
});