var webpack = require('webpack')
var config = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var globalConfig = require('./global.config')
// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
// config.output.filename = '[name].[hash:8].js'
// config.output.chunkFilename = '[id].[hash:8].js'
config.output.publicPath = 'static/'
config.output.filename = '[name].[hash:8].js'
config.output.chunkFilename = '[id].[hash:8].js'


// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = true

config.devtool = SOURCE_MAP ? 'source-map' : false

config.module.loaders.push(
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('css')
  },
  {
    test: /\.scss/,
    loader: ExtractTextPlugin.extract('css!postcss!stylus')
  }
)

config.vue.loaders = {
  css: ExtractTextPlugin.extract('css'),
  stylus: ExtractTextPlugin.extract('css!postcss!stylus')
}

config.plugins = (config.plugins || []).concat([
  // http://vuejs.github.io/vue/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // extract css into its own file
  // new ExtractTextPlugin('[name].[hash:8].css'),
  new ExtractTextPlugin('[name].[contenthash:8].css'),
  // generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /src/index.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.template.ejs',
    title: globalConfig.pageConfig.title,
    favicon: 'src/assets/images/favicon.png',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    }
  })
])

module.exports = config
