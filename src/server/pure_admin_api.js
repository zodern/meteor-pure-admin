PureAdmin._files = [];
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
