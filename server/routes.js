var fs = require('fs')
var path = require('path')
var marked = require('marked')

function serve_file_md(file){
  var md_content = fs.readFileSync(path.join(__dirname, '../views', file)).toString()
  var html_content =  marked(md_content)
  return function(req, reply){
    reply.view('index', { content: html_content })
  }
}


module.exports = function(server){

  server.route([
    {
      path: '/index',
      method: 'get',
      handler: serve_file_md('index.md')
    },
    {
      path: '/',
      method: 'get',
      handler: function(request, reply) {
        reply().redirect('/api-http');
      }
    },
    {
      path: '/api-http',
      method: 'get',
      handler: serve_file_md('endpoints.md')
    },
    {
      path: '/api-http/auth',
      method: 'get',
      handler: serve_file_md('authorization.md')
    },
    {
      path: '/api-http/auth-implementation',
      method: 'get',
      handler: serve_file_md('authorization-implementation.md')
    },

    // special
    {
      path: '/access',
      method: 'get',
      handler: serve_file_md('access.md')
    },
    {
      path: '/workshop',
      method: 'get',
      handler: serve_file_md('workshop.md')
    },

    // redirects
    {
      path: '/api-rest',
      method: 'get',
      handler: function(request, reply) {
        reply().redirect('/api-http')
      }
    },

    // assets

    {
      path: '/assets/{path*}',
      method: 'get',
      handler: {
        directory: {
          path: path.join(__dirname, '../client/')
        }
      }
    }
  ])

}
