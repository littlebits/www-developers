var React = require('reactjs/react-bower:react-with-addons.js')
var { fromJS } = require('facebook/immutable-js@3.1.0:dist/immutable.js')
var routesData = require('./api-http-routes')
var locals = fromJS(require('./locals.yaml'))
var { ELEM } = require('./utils')
var banner = require('./parts/banner')
var serviceCard = require('./parts/service-card')
var sciLine = require('./parts/sci-line')
var params = require('./parts/params')

var r = React
var e = r.DOM
var t = r.PropTypes
var F = r.createFactory



var App = r.createClass({
  displayName: 'app',
  getInitialState: function() {
    return {
      version: '2',
      routesData: routesData,
      locales: locals,
      currentSection: 'HTTP API'
    }
  },
  render: function() {
    return e.
    div({ className: 'app' },
      banner(null),
      renderServiceCards(this.state),
      sectionHead({ className: '', title: this.state.currentSection }),
      toc({ routes: this.state.routesData })
      //renderRoutes(this.state)
    )
  }
})

function renderServiceCards(state) {
  var services = state.locales.get('services')
  return e.section({ className: 'serviceCards' },
    services.map(function(service) {
      return serviceCard({ badge: service.get('badge'), head: sciLine(null, service.get('name')) },
        service.get('summary'))
    }).toJS()
  )
}

var sectionHead = ELEM('section-head', 'section', function(props){
  return e.h1({}, props.title)
})

function renderRoutes(state) {
  return e.
  div({ className: 'routes' },
    state.routesData
    .filter(isVersion(state.version))
    .map(RouteMapper)
    .toJS()
  )
}

var toc = r.createFactory(r.createClass({
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


function RouteMapper(route) {
  return Route({ key: routeKey(route), route: route })
}

function routeKey(route) {
  return route.get('method') +
         route.get('version') +
         route.get('path')
}



/* Route component
   Render the view of one route.
*/
var Route = F(React.createClass({
  displayName: 'route',
  propTypes: {
    route: t.object.isRequired
  },
  render: function() {
    var route = this.props.route
    return e.
    section({ className: 'route' },
      headerEl({ route: route }),
      summaryEl({ route: route }),
      params({ route: route })
    )
  }
}))

var headerEl = ELEM('route-header', 'h1', function(props){
  return props.route.get('method') + ' ' + props.route.get('path')
})

var summaryEl = ELEM('route-summary', 'p', function(props){
  return props.route.getIn(['meta', 'summary'])
})



function isVersion(n) {
  return function(route) {
    return String(route.get('version')) === n
  }
}




// Boot the application

bootstrap(App)

function bootstrap(app, selector){
  selector = selector || '#app-container'
  document.addEventListener('DOMContentLoaded', function(){
    React.render(React.createElement(app), document.querySelector(selector))
  })
}
