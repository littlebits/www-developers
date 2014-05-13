'use strict';
var fs = require('fs');
var path = require('path');
var marked = require('marked');

function serve_file_md(file){
  var md_cotnent = fs.readFileSync(path.join(__dirname, '../views', file)).toString();
  var html_content =  marked(md_cotnent);
  return function(req, reply){
    reply.view('index', {content: html_content});
  };
}


module.exports = function(server){
  server.route({
    path: '/',
    method: 'get',
    handler: function(request, reply) {
      reply().redirect('/api-http');
    }
  });
    server.route({
      path: '/api-rest',
      method: 'get',
      handler: function(request, reply) {
        reply().redirect('/api-http');
      }
    });

  server.route({
    path: '/api-http',
    method: 'get',
    handler: serve_file_md('endpoints.md')
  });

  server.route({
    path: '/api-http/auth',
    method: 'get',
    handler: serve_file_md('authorization.md')
  });

  server.route({
    path: '/api-http/auth-implementation',
    method: 'get',
    handler: serve_file_md('authorization-implementation.md')
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