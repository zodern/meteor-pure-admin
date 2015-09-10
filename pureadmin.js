var fs = Npm.require('fs');
var fileList = [];

function getFileList() {
  if(fileList.length === 0) {
    fileList = fs.readdirSync('./output');
  }
  return fileList;
}

function chooseFile (list, type) {
  list.forEach(function (item) {
    if(item.lastIndexOf(type) === item.length - 3) {
      return item;
    }
  });
}


Picker.route('/admin', function(params, req, res) {
  var fileList = getFileList();
  console.log('filelist', fileList);
  var path = chooseFile(list, 'html');
  console.log('path', path);
  fs.createReadStream(file).pipe(this.res);
});