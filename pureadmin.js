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
  res.end(Assets.getText('index.html'));
});