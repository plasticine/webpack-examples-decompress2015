'use strict';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

var fs = require('fs');
var webpack = require('webpack');
var makeWebpackConfig = require('./makeWebpackConfig');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = makeWebpackConfig({
  cache: (process.env.NODE_ENV !== 'production'),
  watch: true,
  debug: (process.env.NODE_ENV !== 'production'),
  devtool: 'source-map',
  target: 'node',
  entry: {
    server: './server'
  },
  externals: nodeModules,
  node: {
    __dirname: true,
    __filename: true
  },
  resolve: {
    modulesDirectories: ['server']
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __DEV__: (process.env.NODE_ENV !== 'production')
    }),
    new webpack.IgnorePlugin(/\.(css|scss)$/),
    new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
    new webpack.NoErrorsPlugin()
  ]
});
