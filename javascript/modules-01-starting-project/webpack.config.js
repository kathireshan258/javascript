const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'assets', 'scripts'),
        publicPath: 'assets/scripts/'
    },
    devServer: {
        static: './'
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