let path = require('path');
let SRC_DIR = path.join(__dirname, '/client/src');
let DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};