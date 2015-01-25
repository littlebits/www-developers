var r = require('react')
var e = r.DOM





var serviceCard = r.createClass({
  displayName: 'service-card',
  getDefaultProps: function() {
    return {
      head: 'Service',
      badge: null
    }
  },
  render: function() {
    var badge = this.props.badge
    return e.
    div({ className: 'serviceCard' },
      // TODO Also allow badge Object to be passed that overrides this one
      (badge ? e.div({ className: 'badge' }, badge) : badge),
      e.h1({ className: 'fontTitle' }, this.props.head),
      e.p({}, this.props.children)
    )
  }
})


function slug(title) {
  return title.split(' ').join('-').toLowerCase()
}


module.exports = r.createFactory(serviceCard)
