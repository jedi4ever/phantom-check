var casper = require('casper').create({
  //verbose: true,
  //logLevel: "debug"
});

var system = require('system');

// Get the URL
var url = casper.cli.args[0]
if (!url) {
  console.error('Usage: \nphantom-check [--ignore=comma-separated-list-of-urls] <url>');
  casper.exit(-1);
}

// Get the ignore options --ignore=
var ignoreOption = casper.cli.options['ignore']

var ignoreList = [];
if (ignoreOption) {
  ignoreList=ignoreOption.split(',')
}

console.log('Phantom is checking '+ url);

if (ignoreOption) {
  console.log('ignoring: '+ignoreOption);
}
console.log('');

var errors = [];

var fail = function(message) {
  var msg = "Error:" + message;
  casper.echo(msg);
  casper.echo('');
  errors.push(message);
};

casper.on('http.status.404', function(resource) {
    fail('Hey, this one is 404: ' + resource.url, 'ERROR');
});

// http://docs.casperjs.org/en/latest/events-filters.html#events-list
// https://github.com/n1k0/casperjs/blob/master/tests/suites/casper/onerror.js
// Phantomjs page.onError
casper.on('page.error', function(msg,trace) {
  var message = [ msg];
  trace.forEach(function(stack) {
    message.push(JSON.stringify(stack));
  });
  fail(message.join('\n'));
}); 

casper.on('resource.error', function(resourceError) {
  var toIgnore=false;
  ignoreList.forEach(function(ignore) {
    if (resourceError.url.indexOf(ignore) == 0) {
      if (toIgnore === false ) {
        toIgnore=true;
      }
    }
  })
  if (!toIgnore) {
    var msg = resourceError.errorString + ' - ' + resourceError.url;
    fail(msg);
  }
});

// For example dns errors
casper.on('load.failed', function(object) {
  fail(JSON.stringify(object), 'ERROR');
});

casper.on('load.finished', function() {
  this.echo("");

  if (errors.length > 0) {
    var msg = "Page "+url+" has errors"
    this.echo(msg,'RED_BAR');
    this.exit(-1);
  } else {
    var msg = "Page "+url+" has no errors"
    this.echo(msg,'GREEN_BAR');
    this.exit(0);
  }
});

casper.start(url, function() {
});

casper.run();
