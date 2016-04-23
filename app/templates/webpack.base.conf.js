var path = require('path')
var autoprefixer = require('autoprefixer');<% if (props.isMobile) { %>
var pxtorem = require('postcss-pxtorem');<% } %>
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      store: path.join(__dirname, 'src/store'),
      actions: path.join(__dirname, 'src/store/actions'),
      views: path.join(__dirname, 'src/views'),
      styles: path.join(__dirname, 'src/assets/styles'),
      components: path.join(__dirname, 'src/components'),
      modules: path.join(__dirname, 'modules')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      { test: /\.(gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf)$/,
        loader: 'url',
        query: {
          limit: 8912,
          name: 'resources/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    },
    postcss: [<% if (props.isMobile) { %>
      pxtorem({
        rootValue: 100,
        propWhiteList: [],
        replace: true,
        minPixelValue: 3
      }),<% } %>
      autoprefixer({browsers: '> 1%'})
    ],
    autoprefixer: false
  },
  postcss: function () {
    return [<% if (props.isMobile) { %>
      pxtorem({
        rootValue: 100,
        propWhiteList: [],
        replace: true,
        minPixelValue: 3
      }),<% } %>
      autoprefixer({browsers: '> 1%'}) ];
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
