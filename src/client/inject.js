var scripts           = [],
    totalTemplates    = 0,
    finishedTemplates = 0,
    isLoaded          = new ReactiveVar(false);

/**
 * Goes through each file and sends it to the correct loader.
 * Is global
 * @param files {array}
 */
Inject = function (files) {
  files.forEach(function (file) {
    var ext = file.substr(file.lastIndexOf('.') + 1);
    if(ext === 'js') {
      loadJs(file);
    }
    if(ext === 'css') {
      console.log("we don't support loading css yet");
    }
  });
};

// needed by routing
Inject.isLoaded = isLoaded;

/**
 * Takes each script stored in scripts and runs in.
 * It uses new Function to run it in global scope.
 * TODO: wrap js similar to how meteor wraps files
 * TODO: try to ensure load order while handling errors loading and slow connections
 */
function evalJs() {
  scripts.forEach(function (js) {
    var aFunction = new Function(js);
    aFunction();
  });
}

/**
 * Loads the js file and saves it for when templates are loaded
 */
function loadJs(file) {
  $.ajax({
    url: file,
    dataType: "text",
    cache: false
  })
    .done(function (js) {
      if(isLoaded.get()) {
        var result = new Function(js);
        result();
        return;
      }
      scripts.push(js);

    })
    .fail(function (error) {
     console.log("error ", error);
    });
}

/**
 * Goes through each template and calls getAndCompileTemplate on it
 * @param templates
 */
Inject.loadTemplates = function (templates) {
  totalTemplates += _.keys(templates).length;
  _.keys(templates).forEach(function (key) {
    getAndCompileTemplate(templates[key], key);
  });
};

/**
 * Runs after every template has been loaded.
 * Once all of the templates are loaded it calls evalJs.
 */
function finishedTemplate() {
  //console.log('finished');
  finishedTemplates += 1;
  if(finishedTemplates === totalTemplates) {
    // we can load js now that the templates are defined
    isLoaded.set(true);
    evalJs();
  }
}

/**
 * Loads the html file and turns it into a template.
 * @param file
 * @param templateName
 */
function getAndCompileTemplate(file, templateName) {
  $.ajax({
    url: file,
    cache: false
  }).done(function (html) {
    //console.log(html);
    //console.log(templateName);
    Template[templateName] = Template.fromString(html);
    finishedTemplate();
  });
}

/**
 * Loads css
 * @param file
 */
Inject.loadCss = function(file) {
  var el =document.createElement("link");
  el.setAttribute("rel", "stylesheet");
  el.setAttribute("type", "text/css");
  el.setAttribute("href", file);
  document.getElementsByTagName("head")[0].appendChild(el)
}
