var package_json = require('../package');
var path = require('path');



var conf = {
  version: package_json.version,
  port: Number(process.env.PORT) || 80,
  paths: {
    assets: path.join(__dirname, '/../assets')
  }
};

conf.server = {
  views: {
    isCached: false,
    engines: {
      jade: 'jade'
    },
    path: path.join(__dirname, '../views')
  }
};



module.exports = conf;