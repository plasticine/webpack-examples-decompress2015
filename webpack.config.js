module.exports = {
  entry: {
    entry_a: './src/EntryA',
    entry_b: './src/EntryB'
  },
  output: {
    filename: './build/[name].js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
  },
}
