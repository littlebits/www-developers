'use strict';
var path = require('path');



module.exports = function(server){
  server.route({
    path: '/',
    method: 'get',
    handler: function(request, reply) {
      reply().redirect('/rest-api');
    }
  });

  server.route({
    path: '/rest-api',
    method: 'get',
    handler: {
      view: 'index'
    }
  });

  server.route({
    path: '/assets/{path*}',
    method: 'get',
    handler: {
      directory: {
        path: path.join(__dirname, '../client/')
      }
    }
  });
};