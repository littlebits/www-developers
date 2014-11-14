var { ELEM, asCurl } = require('../utils')
var r = require('reactjs/react-bower:react-with-addons.js')
var { List, Map } = require('facebook/immutable-js@3.1.0:dist/immutable.js')
var apiHttpRoot = 'https://api-http.littlebitscloud.cc'

var e = r.DOM



module.exports = ELEM('route-examples', function(props){

  var route = props.route
  var examples = route.getIn(['meta', 'examples'], List())
  if (!examples.size) return null

  var pathArgs = { id: 'a84hf038ierj' }
  // TODO Don't access this variable from closure
  var root = apiHttpRoot
  var path = route.get('path')
  var method = route.get('method')

  return e.
  div(null,
    e.h1({ className: 'fontSubTitle' }, 'Examples'),
    e.ul({ className: 'examples'},
      examples.map(function(example) {
        var body = example.get('requestBody', Map()).toJS()
        var responseBody = example.get('responseBody')
        return e.li({ className: 'example' },
          e.p(null, example.get('description')),
          e.pre({ className: 'codeBlock' },
            asCurl({ root: root, path: path, pathArgs: pathArgs, method: method, body: body })
          ),
          responseBody
            ? e.pre({ className: 'codeBlock'},
                JSON.stringify(responseBody, null, 2)
              )
            : null
        )
      }).toJS()
    )
  )
})
