module.exports = asCurl

function asCurl(rc) {
  return 'curl ' + rc.uri + ' \'Authorization: Bearer ' + rc.token + '\' ' + dataFlag(rc.body)
}

function dataFlag(data) {
  return data ? '--data' + JSON.stringify(data) : ''
}
