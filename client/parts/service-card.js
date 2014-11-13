var r = require('reactjs/react-bower:react-with-addons.js')
var e = r.DOM



var serviceCard = r.createClass({
  displayName: 'service-card',
  getDefaultProps: function() {
    return {
      title: 'Service'
    }
  },
  render: function() {
    return e.
    div({ className: 'serviceCard serviceCard--' + slug(this.props.title) },
      e.h1({ className: 'fontTitle' }, this.props.title),
      e.p({}, this.props.children)
    )
  }
})


function slug(title) {
  return title.split(' ').join('-').toLowerCase()
}


module.exports = r.createFactory(serviceCard)
