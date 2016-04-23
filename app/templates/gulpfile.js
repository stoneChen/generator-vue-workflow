'use strict'

var fs = require('fs'),
  gulp = require('gulp'),
  YAML = require('yamljs'),
  spawn = require('child_process').spawn

var NGROK_CONFIG_FILENAME = 'ngrok.config.yml'
if (!fs.existsSync(NGROK_CONFIG_FILENAME)) {
  fs.createReadStream(NGROK_CONFIG_FILENAME + '.sample').pipe(fs.createWriteStream(NGROK_CONFIG_FILENAME));
}

/**
 * start nat app
 */
gulp.task('ngrok', function (cb) {
  // 不用setTimeout的话,首次刚创建的ngrok.config.yml读进来居然是空的,暂时无解,难道pipe是异步的?
  setTimeout(function () {
    var ngrokConfig = YAML.load(NGROK_CONFIG_FILENAME);
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
  }, 20)

})
