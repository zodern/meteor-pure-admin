// global
PureAdmin = {};

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

function handleRoute(params, req, res) {
  var html = Assets.getText('index.html');
  html = html.replace('//------------replaced-with-root-url-------------------', 'window.Meteor_ROOT_URL = "' + __meteor_runtime_config__.ROOT_URL + '"');
  res.end(html);
}

Picker.route('/admin', handleRoute);
// client side routes, when reloaded, would load the app
Picker.route('/admin/*', handleRoute);
