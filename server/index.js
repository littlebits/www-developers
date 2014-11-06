var path = require('path')
var hapi = require('hapi')
var config = require('./config')
var Routes = require('./routes')



var server = hapi.createServer(config.port, config.server)


server.views({
  engines: {
    jade: require('jade')
  },
  isCached: !config.isDev,
  path: path.join(__dirname, 'views')
})


var plugins = [
]


server.pack.register(plugins, onPluginsLoaded)


function onPluginsLoaded(err) {
  Routes(server)
  if (!err) server.start(logListening)
}

function logListening() {
  console.log('Server running at %s', server.info.uri)
}
