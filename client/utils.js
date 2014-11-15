var {createFactory, createClass, DOM} = require('reactjs/react-bower:react-with-addons.js')



/*
ELEM :: name, (props -> Element) -> ReactFactory
ELEM :: name, tag, (props -> Element) -> ReactFactory
*/
exports.ELEM = function ELEM(name, tag, createChildren, config) {

  if (typeof tag === 'function') {
      config = createChildren
      let tag_ = tag
      tag = 'div'
      createChildren = tag_
  }

  config = config || {}
  config.className = name

  return createFactory(
    createClass({
      displayName: name,
      render: function() {

        /* TODO transferPropsTo is depricated, but really useful right now
        at least for its smart className merging features. */
        return this.transferPropsTo(
          DOM[tag](config, createChildren(this.props))
        )
      }
    })
  )
}



/*

Transform a route object into a valid curl-able string

asCurl :: RequestConfig -> String

*/
exports.asCurl = function asCurl({ root, path, pathArgs, method, query, body, version, token }) {
  version = version || 2
  token = token || 'TOKEN'
  path = path || ''
  pathArgs = pathArgs || {}
  var uri = root + resolvePath(path, pathArgs) + stringifyQuery(query)
  return `
curl -X${method} ${uri} \
     -H 'Authorization: Bearer ${token}' \
     -H 'Accept: application/vnd.littlebits.v${version}+json'${dataFlag(body)}`
}

function resolvePath(path, pathArgs) {
  return !path ? '' : Object.keys(pathArgs || {})
  .reduce(function(path, pathKey) { return path.replace(`{${pathKey}}`, pathArgs[pathKey]) }, path)
}

function stringifyQuery(queryObject = {}) {

  var queryString = Object.keys(queryObject).reduce(function(queries, key){
    return queries.concat([`${key}=${queryObject[key]}`])
  }, []).join('&')

  if (queryString) queryString = '?' + queryString

  return queryString
}

function dataFlag(data) {
  return typeof data === 'object' && Object.keys(data).length ?
  ` \
     --data '${JSON.stringify(data)}'`
  : ''
}
