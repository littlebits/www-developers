import R, { DOM as E } from 'react'



/*
ELEM :: name, (props -> Element) -> ReactFactory
ELEM :: name, tag, (props -> Element) -> ReactFactory
*/
let ELEM = (name, tag, createChildren, config) => {

  if (typeof tag === 'function') {
      config = createChildren
      let tag_ = tag
      tag = 'div'
      createChildren = tag_
  }

  config = config || {}
  config.className = name

  return R.createFactory(
    R.createClass({
      displayName: name,
      render() {
        return (
          E[tag](config, createChildren(this.props))
        )
      }
    })
  )
}



/*

Transform a route object into a valid curl-able string

asCurl :: RequestConfig -> String

*/

let resolvePath = (path, pathArgs) => (
  !path
    ? ''
    : Object.keys(pathArgs || {})
      .reduce((p, pathKey) => (
          p.replace(`{${pathKey}}`, pathArgs[pathKey])
        ),
        path
      )
)

let dataFlag = (data) => (
  typeof data === 'object' && Object.keys(data).length
  ?
  ` \
     --data '${JSON.stringify(data)}'`
  : ''
)

let stringifyQuery = (queryObject = {}) => {
  let queryString = Object
    .keys(queryObject)
    .reduce((queries, key) => (
        queries.concat([`${key}=${queryObject[key]}`])
      ), [])
    .join('&')

  if (queryString) queryString = '?' + queryString

  return queryString
}

let asCurl = ({ root, path, pathArgs, method, query, body, version, token }) => {
  version = version || 2
  token = token || 'TOKEN'
  path = path || ''
  pathArgs = pathArgs || {}
  var uri = root + resolvePath(path, pathArgs) + stringifyQuery(query)
  return `
curl -X${method} ${uri} \\
     -H 'Authorization: Bearer ${token}' \\
     -H 'Content-Type: application/json' \\
     -H 'Accept: application/vnd.littlebits.v${version}+json'${dataFlag(body)}`
}



export {
  ELEM,
  asCurl
}
