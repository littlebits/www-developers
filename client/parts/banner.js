var r = require('reactjs/react-bower:react-with-addons.js')
var e = r.DOM




var Banner = r.createClass({
  displayName: 'banner',
  render: function() {
    return e.
    div({ className: 'banner themeDark' },
      e.h1({className: 'fontHeading'}, 'littleBits Cloud Platform'))
  }
})

module.exports = r.createFactory(Banner)
