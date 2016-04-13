var express = require('express')
var path = require('path')
var proxy = require('proxy-middleware')
var webpack = require('webpack')
var ip = require('ip')
var open = require('open')
var config = require('./webpack.dev.conf')
var globalConfig = require('./global.config')

var curIP = ip.address()
var port = globalConfig.serverPort

var app = express()
var compiler = webpack(config)

app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

if (globalConfig.proxy) {
  app.use(proxy(globalConfig.proxy.target));
}


app.listen(port, curIP, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  var address = ['http://', curIP, ':', port].join('');
  console.log('Go to %s', address);
  open(address);
});
