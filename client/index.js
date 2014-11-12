var react = require('reactjs/react-bower:react-with-addons.js')
// var Immutable = require('facebook/immutable-js@3.1.0:dist/immutable.js')
var routesData = require('./api-http-routes')

var E = react.DOM
var T = react.PropTypes
var F = react.createFactory



var app = react.createClass({
  displayName: 'app',
  getInitialState: function() {
    return {
      version: '2',
      routesData: routesData
    }
  },
  render: function() {
    var routeEls = this.state.routesData
        .filter(isVersion(this.state.version))
        .map(RouteMapper)
        .toJS()
    return E.div(null, routeEls)
  }
})



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
var Route = F(react.createClass({
  displayName: 'route',
  propTypes: {
    route: T.object.isRequired
  },
  render: function(){
    var r = this.props.route
    return E.section({ className: 'route' },
                     E.h1(null, r.get('path')),
                     E.p(null, r.getIn(['meta', 'summary']))
                    )
  }
}))




function isVersion(n) {
  return function(route){
    return String(route.get('version')) === n
  }
}



// Boot the application

bootstrap(app)

function bootstrap(app, selector){
  selector = selector || '#app-container'
  document.addEventListener('DOMContentLoaded', function(){
    react.render(react.createElement(app), document.querySelector(selector))
  })
}
