package_json = require('./package')
hapi = require('hapi')
config =
  version: package_json.version
  port: Number(process.env.ENV_PORT) or 8000
  paths:
    assets: "#{__dirname}/assets"


# Create HTTP Server

server_config =
  views:
    isCached: false
    engines:
      jade: 'jade'
    path: "#{__dirname}/"
server = hapi.createServer( 'localhost', config.port, server_config )
module.exports = server


# Routes

server.route
  path: '/assets/{path*}'
  method: 'get'
  handler:
    directory:
      listing: true
      path: "#{__dirname}/public/"
  config:
    auth: false

server.route
  path: '/rest-api'
  method: 'get'
  handler:
    view: './views/index'
  config:
    auth: false

server.start()
