var gulp = require('gulp');
var child = require('child_process');
var fs = require('fs');
var path = require('path');

gulp.task('build-client', function() {
  var cwd = __dirname + '/src';
  var result = child.execSync(__dirname + '/node_modules/meteor-build-client/main.js ../output ', {cwd: cwd});
  console.log(result.toString('binary'));
  // rename files
  var fileList = fs.readdirSync(__dirname + '/output');
  console.log(fileList);
  fileList.forEach(function (item) {
    var excluded = ['example.js'];
    var ext = path.extname(item);
    if(ext === 'map' || excluded.indexOf(item) !== -1) {
      return;
    }
    var base = __dirname + '/output/';
    fs.renameSync(base + item, base + 'pure-admin' + ext );
  });
});

gulp.task('watch', function() {
  gulp.watch(['src.*', '!.meteor/*'], ['build-client']);
});

gulp.task('default',['watch', 'build-client']);
