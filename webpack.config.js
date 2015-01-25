var join = require('path').join



var isProduction = process.env.NODE_ENV === 'production'

/* Environment-dependent Settings */

var outputDir = join(__dirname, (isProduction ? './client-dist' : './client-build'))
var indexEntry = [].concat('./client/index.js').concat(isProduction ? [] : ['webpack/hot/dev-server'])
var jsLoaders = [].concat(['6to5']).concat(isProduction ? [] : ['react-hot']).reverse()
var devServer = isProduction ? null : { contentBase: outputDir }
var devtool = isProduction ? 'source-map' : 'eval'



var config = {
  entry: {
   index: indexEntry
  },
  output: {
    path: outputDir,
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: jsLoaders },
      { test: /\.woff$/, loaders: ['url'] },
      { test: /\.css$/, loaders: ['style', 'css', 'cssnext'] },
      { test: /\.json$/, loaders: ['json'] },
      { test: /\.yaml$/, loaders: ['json', 'yaml'] }
    ]
  },
  devtool: devtool,
  devServer: devServer
}


module.exports = config
