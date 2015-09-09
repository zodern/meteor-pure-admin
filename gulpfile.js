var gulp = require('gulp');
var child = require('child_process');

gulp.task('build-client', function() {
  var cwd = __dirname + '/src';
  child.exec(__dirname + '/node_modules/meteor-build-client/main.js ../output ', {cwd: cwd}, function (err, result) {
    console.log(err);
    console.log(result);
  });
});