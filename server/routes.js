var path = require('path')
var cp = require('child_process')



module.exports = function(server){

  server.route([
    {
      path: '/',
      method: 'get',
      handler: {
        view: 'index'
      }
    },
    {
      path: '/api-http',
      method: 'get',
      handler: {
        view: 'api-http'
      }
    },
    {
      path: '/api-http/auth',
      method: 'get',
      handler: function(){} //serve_file_md('api-authorization.md')
    },
    {
      path: '/api-http/auth-implementation',
      method: 'get',
      handler: function(){} //serve_file_md('api-authorization-implementation.md')
    },

    // special
    {
      path: '/access',
      method: 'get',
      handler: function(){} // serve_file_md('access.md')
    },
    {
      path: '/workshop',
      method: 'get',
      handler: function(){} // serve_file_md('workshop.md')
    },

    // assets
    {
      path: '/assets/{path*}',
      method: 'get',
      config: {
        pre: [function(req, rep){
          cp.exec('npm run build-client', function(err){
            if (err) throw err
            rep()
          })
        }]
      },
      handler: {
        directory: {
          path: path.join(__dirname, '../client')
        }
      }
    }
  ])

}
