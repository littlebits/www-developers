var React = require('reactjs/react-bower:react-with-addons.js')



exports.ELEM = function ELEM(name, tag, createChildren, config) {
  config = config || {}
  config.className = name
  return React.createFactory(
    React.createClass({
      displayName: name,
      render: function() {
        return this.transferPropsTo(
          React.DOM[tag](config, createChildren(this.props))
        )
      }
    })
  )
}
