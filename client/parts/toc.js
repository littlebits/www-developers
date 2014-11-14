var r = require('reactjs/react-bower:react-with-addons.js')
var e = r.DOM,
    t = r.PropTypes


module.exports = r.createFactory(r.createClass({
  displayName: 'table-of-contents',
  propTypes: {
    route: t.object.isRequired
  },
  render: function() {
    var resources = byResource(this.props.routes)
    return e.
    div({ className: 'toc' },
      resources.map(function(resource, path) {
        return e.
        div({ className: 'toc-section' },
          e.h1({ className: 'toc-section-title' }, path),
          e.div({ className: 'toc-section-item' }, resource.map(function(route) {
            return e.a({ id: route.get('id'), href: `#${route.get('id')}` }, route.get('method'))
          }).toJS())
        )
      k}).toList().toJS()
    )
  }
}))



function byResource(routes) {
  return routes.groupBy(function(route){
    return route.get('path')
  })
}
