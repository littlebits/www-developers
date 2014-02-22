package_json = require('./package')
hapi = require('hapi')
os = require('os')
config =
  version: package_json.version
  port: process.env.PORT or 8000
  paths:
    assets: "#{__dirname}/assets"

console.log('Server is running at http://' + os.hostname() + ":" + config.port);

# Create HTTP Server

server_config =
  views:
    isCached: false
    engines:
      jade: 'jade'
    path: "#{__dirname}/"

switch process.env.NODE_ENV
  when 'dev' then server = hapi.createServer( 'localhost', config.port, server_config )
  else server = hapi.createServer( server_config )


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

