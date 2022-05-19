const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  // entry: {
  //   'SharePlace': './src/SharePlace.js',
  //   'MyPlace': './src/MyPlace.js',
  // },
  entry: './src/SharePlace.js',
  output: {
    filename: 'SharePlace.js',
    path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
    publicPath: 'assets/scripts/'
  },
  
  devServer: {
    static: './dist'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { useBuiltIns: 'usage', corejs: { version: 3 } }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        // devTools: 'eval-source-map'
        // devTools: 'eval-cheap-module-source-map'
        devTools: 'cheap-module-source-map'
        // devTools: 'source-map'
        // devTools: 'cheap-source-map'
      }
    }),
    new CleanPlugin.CleanWebpackPlugin()
  ]
};