var react = require('reactjs/react-bower:react-with-addons.js')
var routes = require('./api-http-routes.json')

var E = react.DOM
var T = react.PropTypes
var F = react.createFactory



var app = react.createClass({
  displayName: 'app',
  getInitialState: function(){
    return {
      version: '3'
    }
  },
  render: function() {
    return E.div(null, routes
      .filter(isVersion(this.state.version))
      .map(RouteMapper))
  }
})



function RouteMapper(route) {
  var key = route.method + route.version + route.path
  return Route({ key: key, route: route })
}

var Route = F(react.createClass({
  displayName: 'route',
  propTypes: {
    route: T.object.isRequired
  },
  render: function(){
    return E.h1(null, this.props.route.path)
  }
}))


bootstrap(app)


function isVersion(n) {
  return function(route){
    return String(route.version) === n
  }
}

function bootstrap(app, selector){
  selector = selector || '#app-container'
  document.addEventListener('DOMContentLoaded', function(){
    react.render(react.createElement(app), document.querySelector(selector))
  })
}
