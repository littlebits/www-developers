'use strict';
var server = require('./server');


require('./routes')(server);

server.start(function() {
  console.log('Server running at %s', server.info.uri);
});