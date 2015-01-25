var path = require('path')
var cp = require('child_process')
var config = require('./config')



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
      handler: {
        directory: {
          path: path.join(__dirname, '../client')
        }
      }
    }
  ])
}
