
/* Build routes data. Combine machine-generated data from the HTTP API
with hand-written data from our docs file. */

var debug = require('visionmedia/debug')('www-developers')
var { fromJS } = require('facebook/immutable-js@3.1.0:dist/immutable.js')
var routesMachine = fromJS(require('./data-routes.json'))
var routesMeta = fromJS(require('./data-routes.yaml'))



module.exports = routesMeta.map(function(meta) {

  var i = routesMachine.findIndex(isEqualRoute.bind(null, meta))

  if (i === -1) {
    console.error('Failed to compile route data because manual data had no match in machine data: ', meta.toJS())
    return null
  }

  return routesMachine.get(i)

    /* Merge the machine data with our hand-written
    data. TODO we are shortening device_id in two
    places because we need to spend more time making
    a decent deep merge. */
    .set('meta', meta.update('path', shortenDeviceId))

    /* It is useful to have a unique id per route
    for React list-item rendering purposes as, and also
    anchor links etc. */
    .set('id', routeId(routesMachine.get(i)))

    /* The string "device_id" in the route path
    is long and makes view layout harder. Make it
    sweet and short. */
    .update('path', shortenDeviceId)
})

/* Clear any null values we
may have  encountered while
matching */
.filter( x => x )

debug('resolved routes data:', module.exports.toJS())



// Helpers

function isEqualRoute(routeA, routeB) {
  return routeA.get('path') === routeB.get('path') &&
         routeA.get('method') === routeB.get('method')
}

function shortenDeviceId(path) {
  return path.replace('device_id', 'id')
}

function routeId(route) {
  return route.get('method') + '-' + route.get('path').replace(/\//g,'--')
}
