'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    yeoman.generators.Base.apply(this, arguments);
    this.argument('appName', {
      type: String,
      required: false,
      defaults:path.basename(process.cwd())
    });
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the  AWESOME ' + chalk.red('generator-vue-workflow') + ' generator!'
    ));

    var prompts = [
      {
        type: 'confirm',
        name: 'isMobile',
        message: 'Is your project mobile?',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.sourceRoot(path.join(__dirname, '.'));
    this.directory('templates', './');
  },

  install: function () {
    if(this.options['skip-install']){
      return;
    }
    this.log(chalk.yellow('Start to install npm dependencies:'));
    this.npmInstall();
  },
  end: function () {
    this.log(chalk.green('Yeoman Initialization has been done. Have fun!'));
  }
});
