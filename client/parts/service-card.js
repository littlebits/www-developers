var r = require('reactjs/react-bower:react-with-addons.js')
var e = r.DOM



var serviceCard = r.createClass({
  displayName: 'service-card',
  getDefaultProps: function() {
    return {
      head: 'Service'
    }
  },
  render: function() {
    return e.
    div({ className: 'serviceCard' },
      e.h1({ className: 'fontTitle' }, this.props.head),
      e.p({}, this.props.children)
    )
  }
})


function slug(title) {
  return title.split(' ').join('-').toLowerCase()
}


module.exports = r.createFactory(serviceCard)
