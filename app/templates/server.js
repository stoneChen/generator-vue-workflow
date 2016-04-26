var express = require('express')
var path = require('path')
var doProxy = require('proxy-middleware')
var webpack = require('webpack')
var fs = require('fs')
var ip = require('ip')
var open = require('open')
var yamljs = require('yamljs')
var config = require('./webpack.dev.conf')
var globalConfig = require('./global.config')

var rapNode = require('rap-node-plugin')// rap插件
global.RAP_FLAG = 1  // 开启rap服务
rapNode.config(globalConfig.rap)

var PROXY_CONFIG_FILENAME = 'proxy.config.yml'
if (!fs.existsSync(PROXY_CONFIG_FILENAME)) {
  fs.writeFileSync(PROXY_CONFIG_FILENAME, fs.readFileSync(PROXY_CONFIG_FILENAME + '.sample'));
}

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

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist/index.html'))
// })

//数据请求中间件
app.use(function (req, res, next) {
  console.log('middleware:', req.url)
  if (req.url === '/index.html') { // 首次启动服务时,如果模块打包失败,输出error.html,否则index.html将会被代理到proxy配置的远程服务
    res.sendFile(path.join(__dirname, 'error.html'))
    return
  }
  var apiRoot = getApiRoot()
  if (apiRoot === 'RAP') {
    console.warn('RAP MODE detected, use rap to mock data')
    rapNode.getRapData(req.url, function (err, data) {
      if (err) {
        res.end(JSON.stringify(err))
        return
      }
      res.end(JSON.stringify(data))
    })
  }else if (apiRoot) {
    console.info('remote apiRoot found, dispatched to `%s`', apiRoot)
    return doProxy(apiRoot)(req, res, next)
  } else {
    console.error('apiRoot NOT FOUND!')
    res.end(JSON.stringify({
      stat: 'error',
      msg: 'apiRoot NOT FOUND!'
    }))
  }
  // 暂不提供本地 mock
  // else {
  //   warn('apiRoot NOT found, use local mock data')
  //   var result = getMockData(match)
  //   res.end(result)
  // }
})

app.listen(port, curIP, function (err) {
  if (err) {
    console.error(err)
    return
  }
  var address = ['http://', curIP, ':', port].join('')
  console.log('Go to %s', address)
  open(address)
})


function getApiRoot() {
  var proxyCfg = {}
  try {
    proxyCfg = yamljs.load(PROXY_CONFIG_FILENAME)
  } catch (err) {
    console.error('Reading %s failed', PROXY_CONFIG_FILENAME)
    console.error(err)
  }
  return proxyCfg.proxy
}
