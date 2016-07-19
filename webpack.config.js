module.exports = {
  entry: './client/index.js',
  output: {
    path: './client/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'react' ] }
      }
    ]
  },
  devServer: {
    historyApiFallback: false,
    hot: true,
    contentBase: './client/'
  },
  proxy: {
    '/api/*': {
      target: 'http://localhost:3000',
      bypass(req, res) {
        return (req) ? '/index.html' : false;
      }
    }
  }
};