var marked = require('marked')
var path = require('path')
var fs = require('fs')


function serve_file_md(file) {
  var mdContents = fs.readFileSync(path.join(__dirname, 'views-legacy', file)).toString()
  var html_content = marked(mdContents)
  return function(req, reply){
    reply.view('index-legacy', { content: html_content })
  }
}



module.exports = function(server) {

  server.route([
    {
      path: '/',
      method: 'get',
      handler: serve_file_md('api-http.md')
    },
    {
      path: '/api-http',
      method: 'get',
      handler: serve_file_md('api-http.md')
    },
    {
      path: '/index',
      method: 'get',
      handler: serve_file_md('index.md')
    },
    {
      path: '/api-http/auth',
      method: 'get',
      handler: serve_file_md('api-authorization.md')
    },
    {
      path: '/api-http/auth-implementation',
      method: 'get',
      handler: serve_file_md('api-authorization-implementation.md')
    },
    {
      path: '/access',
      method: 'get',
      handler: serve_file_md('access.md')
    },
    {
      path: '/workshop',
      method: 'get',
      handler: serve_file_md('workshop.md')
    }
  ])
}
