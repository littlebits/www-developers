var React = require('reactjs/react-bower:react-with-addons.js')
var { fromJS } = require('facebook/immutable-js@3.1.0:dist/immutable.js')
var routesData = require('./api-http-routes')
var locals = fromJS(require('./locals.yaml'))
var { ELEM } = require('./utils')
var banner = require('./parts/banner')
var serviceCard = require('./parts/service-card')
var sciLine = require('./parts/sci-line')
var params = require('./parts/params')

var e = React.DOM
var T = React.PropTypes
var F = React.createFactory



var App = React.createClass({
  displayName: 'app',
  getInitialState: function() {
    return {
      version: '2',
      routesData: routesData,
      locales: locals
    }
  },
  render: function() {
    return e.
    div({ className: 'app' },
      banner(null),
      renderServiceCards(this.state),
      renderRoutes(this.state)
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

function renderRoutes(state) {
  return e.
  div({ className: 'routes' },
    state.routesData
    .filter(isVersion(state.version))
    .map(RouteMapper)
    .toJS()
  )
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
    route: T.object.isRequired
  },
  render: function() {
    var route = this.props.route
    console.log(route.toJS())
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
