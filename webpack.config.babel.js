import { join } from 'path'

const path = join.bind(null, __dirname)



const isProduction = process.env.NODE_ENV === 'production'
let indexEntry = ['./client/index.js']
let outputDir = path('./client-build')
let jsLoaders = ['babel']

if (isProduction) {
  indexEntry.push('webpack/hot/dev-server')
  outputDir = path('./client-dist')
  jsLoaders = ['react-hot'].concat(jsLoaders)
}

export default {
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
      { test: /\.woff$/, loaders: ['url']},
      { test: /\.css$/, loaders: [ 'style', 'css', 'cssnext' ]},
      { test: /\.json$/, loaders: ['json']},
      { test: /\.yaml$/, loaders: [ 'json', 'yaml' ]}
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: outputDir
  }
}
