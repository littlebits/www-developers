var React = require('reactjs/react-bower:react-with-addons.js')
var E = React.DOM




var Banner = React.createClass({
  displayName: 'banner',
  render: function() {
    return E.div({ className: 'banner themeSecondary fontTitle' }, 'littleBits Cloud Platform')
  }
})

module.exports = React.createFactory(Banner)
