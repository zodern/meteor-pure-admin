PureAdmin._files = [];
PureAdmin._styleSheets = [];
PureAdmin._templates = {};
PureAdmin.addFiles = function (files) {
  if(typeof files === 'string') {
    PureAdmin._files.push(files);
  }
  if(files instanceof Array) {
    files.forEach(function (item) {
      //console.log(item);
      PureAdmin._files.push(item);
    });
    //console.log(PureAdmin._files);
  }
};

PureAdmin.addTemplate = function (name, file) {
  PureAdmin._templates[name] = file;
};

PureAdmin.addStyleSheet = function (files) {
  if(typeof files === 'string') {
    PureAdmin._styleSheets.push(files);
  } else if(files instanceof Array) {
    files.forEach(function (file) {
      PureAdmin._styleSheets.push(file);
    });
  }
};
