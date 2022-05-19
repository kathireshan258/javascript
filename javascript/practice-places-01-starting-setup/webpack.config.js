const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'SharePlace': './src/SharePlace.js',
        'MyPlace': './src/MyPlace.js',
      },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
        publicPath: 'dist/assets/scripts/'
    },
    devServer: {
        static: './dist/'
    },
    // plugins: [new webpack.EvalSourceMapDevToolPlugin({})]
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