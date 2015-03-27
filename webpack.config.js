module.exports = {
  entry: './src',
  output: {
    filename: './build/main.js'
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.jsx?$/, loader: 'babel-loader' }
    ]
  },
  // resolve: {
  //   extensions: ['', '.js', '.coffee'],
  // },
}
