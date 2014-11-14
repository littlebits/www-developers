// Build routes data. Combine machine-generated data from the HTTP API
// with hand-written data from our docs file.
var debug = require('visionmedia/debug')('www-developers')
var Immutable = require('facebook/immutable-js@3.1.0:dist/immutable.js')
var routesMachine = Immutable.fromJS(require('./api-http-routes.json'))
var routesMeta = Immutable.fromJS(require('./api-http-meta.yaml'))



module.exports = routesMeta

.map(function(meta) {

  var i = routesMachine.findIndex(function(route) {
    return meta.get('path') === route.get('path') &&
           meta.get('method') === route.get('method')
  })

  if (i === -1) {
    console.error('Failed to compile route data because manual data had no match in machine data: ', meta.toJS())
    return null
  }

  return routesMachine.get(i)
    .set('meta', meta.update('path', shortId))
    .update('path', shortId)
    .set('id', uid(routesMachine.get(i)))
})

.filter(function(x){ return x })

debug('resolved routes data:', module.exports.toJS())


function shortId(path) {
  return path.replace('device_id', 'id')
}

function uid(route) {
  return route.get('method') + '-' + route.get('path').replace(/\//g,'--')
}
