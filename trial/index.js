var webPage = require('webpage');
var page = webPage.create();
var system = require('system');

var errors = [];
var url = system.args[1];

if (!url) {
  console.error('Usage: http-pagecheck <url>');
  phantom.exit(-1)
}

var requestUrl = function(url) {

  console.log('==========================================================================');
  page.onLoadFinished = function(status) {
    if (status !== 'success') {
      errors.push('Error loading Page:'+ status);
    }

    if (errors.length > 0) {
      errors.forEach(function(err) {
        console.error(err);
      });
      //phantom.exit(-1);
    } else {
      //phantom.exit(0);
    }

    setTimeout(function() {
      errors.length = 0
      requestUrl(url);
    },4000);
  };

  page.onConsoleMessage = function(msg, lineNum, sourceId) {
    errors.push('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
  };

  page.onResourceError = function(resourceError) {
    var msg = 'Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')\n';
    msg = msg + 'Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString;
    errors.push(msg);
  };

  page.onError = function(msg, trace) {

    var msgStack = ['ERROR: ' + msg];

    if (trace && trace.length) {
      msgStack.push('TRACE:');
      trace.forEach(function(t) {
        msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
      });
    }

    errors.push(msgStack.join('\n'));

  };


  page.onResourceReceived = function(j) {
    var n = j.url.lastIndexOf('.');
    var extension = j.url.substr(n);

    if (j.status === 200 && j.stage === 'end') {
      var NotAllowed = [ '.gif', '.jpg', '.svg', '.png' ];
      if ((NotAllowed.indexOf(extension) === -1)) {
        for (var i = 0; i < j.headers.length; i++) {
          var header = j.headers[i];
          if (header.name === 'X-Served-By') {
            //console.log(j.url, j.headers[i].name + ': ' + j.headers[i].value);
          }
        }
      }
    }
  };

  page.settings.userName = "user";
  page.settings.password = "password";
  page.open(url);
}
requestUrl(url);
