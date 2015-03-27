'use strict';

var path = require('path');
var __root = path.resolve(path.join(__dirname, '../'));
var webpack = require('webpack');
var deepMerge = require('deep-merge');

var merge = deepMerge(function(target, source) {
  if(target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

module.exports = function makeWebpackConfig(config, options){
  var configOptions = options || {};
  var defaultConfig = {
    context: __root,
    output: {
      path: path.join(__root, 'build'),
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
      publicPath: '/'
    },

    module: {
      loaders: [
        { test: /\.jsx?$/, loaders: [(configOptions.hot === true ? 'react-hot' : null), 'babel'].filter(Boolean), include: path.join(__root, 'src') },
        { test: /\.jsx?$/, loaders: ['babel'], include: path.join(__root, 'server') },
        { test: /\.scss$/, loaders: ['style', 'css', 'autoprefixer', 'sass'], exclude: /node_modules/ },
        { test: /\.(png|svg|gif|jpg)$/, loaders: ['url'], exclude: /node_modules/ }
      ]
    },

    resolve: {
      extensions: ['', '.js', '.jsx', '.scss', '.gif'],
      modulesDirectories: ['src', 'node_modules']
    },

    plugins: [
      new webpack.PrefetchPlugin('react'),
      new webpack.PrefetchPlugin('react-router'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],

    devServer: {
      hot: (configOptions.hot === true),
      historyApiFallback: true,
      noInfo: true,
      stats: {
        cached: false
      }
    }
  };

  return merge(defaultConfig, config);
};
