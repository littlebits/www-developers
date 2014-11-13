var r = require('reactjs/react-bower:react-with-addons.js')
var { List } = require('facebook/immutable-js@3.1.0:dist/immutable.js')
var { ELEM } = require('../utils')



var e = r.DOM



module.exports = ELEM('route-params-body', 'section', function(props){
  var params = props.route.getIn(['meta', 'bodyParams'], List())
  return e.
  div(null,
    e.h2(null, 'Params'),
    e.ul({ className: 'params' },
      params.map(function(param) {
        return e.
        li({ className: 'param' },
          e.span({ className: 'param-name' }, param.get('name')),
          //e.span(null, param.get('type')),
          //e.span(null, param.get('required').toString()),
          e.p({ className: 'param-summary' }, param.get('summary'))
        )
      }).toJS()
    )
  )
})
