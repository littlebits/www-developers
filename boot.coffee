package_json = require('./package')
hapi = require('hapi')
os = require('os')
config =
  version: package_json.version
  port: Number(process.env.PORT) or 80
  paths:
    assets: "#{__dirname}/assets"


# Create HTTP Server

server_config =
  views:
    isCached: false
    engines:
      jade: 'jade'
    path: "#{__dirname}/"

server = hapi.createServer( config.port, server_config )


# Routes

server.route
  path: '/'
  method: 'get'
  handler: (request, reply)->
    reply().redirect('/rest-api')

server.route
  path: '/rest-api'
  method: 'get'
  handler:
    view: './views/index'

server.route
  path: '/assets/{path*}'
  method: 'get'
  handler:
    directory:
      path: "#{__dirname}/public/"

server.start(-> console.log('Server is running at http://' + os.hostname() + ":" + config.port))