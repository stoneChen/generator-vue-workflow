'use strict'

var gulp = require('gulp'),
  spawn = require('child_process').spawn
var ngrokConfig;
try {
  ngrokConfig = require('./ngrok.config.json') 
} catch (e) {
  ngrokConfig = require('./ngrok.config.sample.json')
}
/**
 * start nat app
 */
gulp.task('ngrok', function (cb) {
  // console.log('hehe')
  var ngrok = spawn(__dirname + '/ngrok/' + ngrokConfig.env + '/ngrok', [
    '-config',
    __dirname + '/ngrok/' + ngrokConfig.env + '/ngrok.cfg',
    '-subdomain', ngrokConfig.subname,
    ngrokConfig.port
  ])

  ngrok.stdout.on('data', function data (data) {
    console.log('' + data)
  })

  ngrok.stderr.on('data', function data (data) {
    console.log('' + data)
  })

  ngrok.on('close', function data (data) {
    console.log('ngrok closed')
    cb()
  })
})
