const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
  publicPath: '/',
  port: 9000,
  contentBase: path.join(__dirname, 'dist'),
  host: '127.0.0.1',
  hot: true,
  },
  entry: './src/index.js',
  module: {
  rules: [
    {
    include: [path.resolve(__dirname, 'src')],
    loader: 'babel-loader',
    test: /\.js$/,
    },
    {
    include: [path.resolve(__dirname, 'src')],
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
    },
  ],
  },
  output: {
  path: path.resolve(__dirname, './dist'),
  filename: '[name].[hash].bundle.js',
  },
  plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    favicon: './src/assets/favicon.ico',
  }),
  ],
};
