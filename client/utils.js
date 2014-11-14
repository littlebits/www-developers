var {createFactory, createClass, DOM} = require('reactjs/react-bower:react-with-addons.js')



exports.ELEM = function ELEM(name, tag, createChildren, config) {
  config = config || {}
  config.className = name
  return createFactory(
    createClass({
      displayName: name,
      render: function() {

        /* TODO transferPropsTo is depricated, but really useful right now
        at least for its smart className merging features. */
        return this.transferPropsTo(
          DOM[tag](config, createChildren(this.props))
        )
      }
    })
  )
}



/* Transform a route object into a valid curl-able string
*/
exports.asCurl = function asCurl(rc) {
  return 'curl ' + rc.uri + ' \'Authorization: Bearer ' + rc.token + '\' ' + dataFlag(rc.body)
}

function dataFlag(data) {
  return data ? '--data' + JSON.stringify(data) : ''
}
