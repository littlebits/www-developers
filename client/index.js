var React = require('reactjs/react-bower:react-with-addons.js')
var Immutable = require('facebook/immutable-js@3.1.0:dist/immutable.js')
var routesData = require('./api-http-routes')

var E = React.DOM
var T = React.PropTypes
var F = React.createFactory



var app = React.createClass({
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
    return E.div({ className: 'routes' }, routeEls)
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
var Route = F(React.createClass({
  displayName: 'route',
  propTypes: {
    route: T.object.isRequired
  },
  render: function() {
    var route = this.props.route
    console.log(route.toJS())
    return E.
    section({ className: 'route' },
      headerEl({ route: route }),
      summaryEl({ route: route }),
      paramsBodyEl({ route: route })
    )
  }
}))

var headerEl = ELEM('route-header', 'h1', function(props){
  return props.route.get('method')  + ' ' + props.route.get('path')
})

var summaryEl = ELEM('route-summary', 'p', function(props){
  return props.route.getIn(['meta', 'summary'])
})

var paramsBodyEl = ELEM('route-params-body', 'section', function(props){
  var params = props.route.getIn(['meta', 'bodyParams'], Immutable.List())
  return E.
  div(null,
    E.h2(null, 'Params'),
    E.ul({ className: 'params' },
      params.map(function(param) {
        return E.
        li({ className: 'param' },
          E.span({ className: 'param-name' }, param.get('name')),
          //E.span(null, param.get('type')),
          //E.span(null, param.get('required').toString()),
          E.p({ className: 'param-summary' }, param.get('summary'))
        )
      }).toJS()
    )
  )
})




function ELEM(name, tag, createChildren, config) {
  config = config || {}
  config.className = name
  return React.createFactory(
    React.createClass({
      name: name,
      render: function() {
        return React.DOM[tag](config, createChildren(this.props))
      }
    })
  )
}

function isVersion(n) {
  return function(route) {
    return String(route.get('version')) === n
  }
}




// Boot the application

bootstrap(app)

function bootstrap(app, selector){
  selector = selector || '#app-container'
  document.addEventListener('DOMContentLoaded', function(){
    React.render(React.createElement(app), document.querySelector(selector))
  })
}
