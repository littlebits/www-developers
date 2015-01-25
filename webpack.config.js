var join = require('path').join
var outputDir = join(__dirname, (process.env.NODE_ENV === 'production' ? './client-dist' : './client-build'))



module.exports = {
  entry: {
    index: ['webpack/hot/dev-server', './client/index.js']
  },
  output: {
    path: outputDir,
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', '6to5'] },
      { test: /\.woff$/, loaders: ['url'] },
      { test: /\.css$/, loaders: ['style', 'css', 'cssnext'] },
      { test: /\.json$/, loaders: ['json'] },
      { test: /\.yaml$/, loaders: ['json', 'yaml'] }
    ]
  },
  devtool: 'eval',
  devServer: {
    contentBase: './client-build'
  }
}
