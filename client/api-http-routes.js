// Build routes data. Combine machine-generated data from the HTTP API
// with hand-written data from our docs file.
var Immutable = require('facebook/immutable-js@3.1.0:dist/immutable.js')
var routesMachine = Immutable.fromJS(require('./api-http-routes.json'))
var routesMeta = Immutable.fromJS(require('./api-http-meta.yaml'))



var reducing = routesMachine

module.exports = routesMeta.map(function(meta) {
  var i = reducing.findIndex(function(route) {
    // console.log('!', meta.get('path'), route.get('path'))
    return meta.get('path') === route.get('path') &&
           meta.get('method') === route.get('method')
  })

  if (i === -1) {
    console.error('Failed to compile route data because manual data had no match in machine data: ', meta.toJS())
    return null
  }

  reducing = routesMachine.slice(i, 1)
  return routesMachine.get(i).set('meta', meta)
})

.filter(function(x){ return x })

console.log('resolved routes data:', module.exports.toJS())
