var path = require('path')



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
          path: path.join(__dirname, '../client-dist')
        }
      }
    }
  ])
}
