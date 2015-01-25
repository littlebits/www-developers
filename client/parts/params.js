var r = require('react')
var { List } = require('immutable')
var { ELEM } = require('../utils')



var e = r.DOM



module.exports = ELEM('route-params-body', 'section', function(props) {
  var isQuery = false
  var params = props.route.getIn(['meta', 'bodyParams'], List())
  if (!params.size) {
    params = props.route.getIn(['meta', 'queryParams'], List())
    isQuery = true
    if (!params.size) return null
  }
  return e.
  div(null,
    e.h2({ className: 'fontSubTitle' }, isQuery ? 'Query Parameters' : 'Parameters'),
    e.ul({ className: 'params' },
      params.map(function(param) {
        return e.
        li({ className: 'param' },
          e.div({ className: 'param-name-col' },
            e.span({ className: 'param-name fontCode' }, param.get('name'))
          ),
          e.p({ className: 'param-summary-col' }, param.get('summary'))
        )
      }).toJS()
    )
  )
})
