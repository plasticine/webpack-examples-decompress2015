'use strict';

require('dotenv').load();

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('nodemon');
var webpack = require('webpack');
var prettyMs = require('pretty-ms');
var objectAssign = require('object-assign');

function onBuild(done) {
  return function(error, stats) {
    if (error) {
      gutil.beep();
      throw new gutil.PluginError('Webpack', error);
    }
    var statsJson = stats.toJson();
    if (statsJson.errors.length > 0) {
      gutil.beep();
      gutil.log(gutil.colors.red(statsJson.errors[0]));
    }
    if (statsJson.warnings.length > 0) {
      gutil.log(gutil.colors.yellow(statsJson.warnings));
    }
    var duration = prettyMs(stats.endTime - stats.startTime);
    gutil.log('Webpack successfully built "' + stats.hash + '" in ' + duration);
    if (done) {
      done();
    }
  };
}

gulp.task('watch-client', function() {
  var compiler = webpack(require('./config/webpack.client.config'));
  compiler.watch(100, onBuild());
});

gulp.task('webpack-dev-server', function() {
  var WebpackDevServer = require('webpack-dev-server');
  var config = require('./config/webpack.client.config');
  var compiler = webpack(config);
  var devServer = new WebpackDevServer(compiler, objectAssign(config.devServer, {
    publicPath: config.output.publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }));
  devServer.listen(process.env.DEVSERVER_PORT, '127.0.0.1', function (err) {
    if (err) {
      gutil.log(gutil.colors.red(err));
    }
    gutil.log(gutil.colors.green('Webpack dev-server listening at http://127.0.0.1:'+ process.env.DEVSERVER_PORT));
  });
});

gulp.task('watch-server', function() {
  var serverProcess = null;
  var compiler = webpack(require('./config/webpack.server.config'));
  compiler.watch(100, onBuild(function(){
    if (!serverProcess) {
      serverProcess = nodemon({
        execMap: {
          js: 'node'
        },
        script: path.join(__dirname, 'build/server'),
        ignore: ['*'],
        ext: 'noop'
      });
      serverProcess.on('restart', function() {
        gutil.log(gutil.colors.yellow('UI server restarting after changes!'));
      });
    }
    nodemon.restart();
  }));
});

gulp.task('up', ['webpack-dev-server', 'watch-server']);
