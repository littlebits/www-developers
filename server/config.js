var version = require('../package').version
var path = require('path')



module.exports = {
  version: version,
  isDev: !process.env.NODE_ENV || process.env.NODE_ENV === 'dev',
  env: process.env.NODE_ENV || 'dev',
  port: Number(process.env.PORT) || 80,
  paths: {
    assets: path.join(__dirname, '/../assets')
  }
}
