var path = require('path')
var cp = require('child_process')



module.exports = function(server){

  server.route([
    {
      path: '/preview',
      method: 'get',
      handler: {
        view: 'index'
      }
    },
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
