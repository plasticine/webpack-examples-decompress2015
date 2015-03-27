'use strict';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var makeWebpackConfig = require('./makeWebpackConfig');

var plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEV__: (process.env.NODE_ENV !== 'production')
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }));
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new CompressionPlugin());
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

var config = {
  cache: (process.env.NODE_ENV !== 'production'),
  devtool: (process.env.NODE_ENV !== 'production' ? '#eval-source-map' : 'source-map'),
  pathinfo: (process.env.NODE_ENV !== 'production'),
  target: 'web',
  entry: {
    application: ['./src']
  },
  plugins: plugins.concat(new webpack.NoErrorsPlugin())
};

if (process.env.NODE_ENV === 'development') {
  config.entry.application.unshift('webpack/hot/only-dev-server');
  config.entry.application.unshift('webpack-dev-server/client?http://127.0.0.1:' + process.env.DEVSERVER_PORT);
  config.output = {
    publicPath: 'http://127.0.0.1:' + process.env.DEVSERVER_PORT +'/'
  };
}

var options = {
  hot: (process.env.NODE_ENV !== 'production')
};

module.exports = makeWebpackConfig(config, options);
