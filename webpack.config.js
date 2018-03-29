/**
 * @file webpack.config.js
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project async-is-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const libraryName = 'async-is-fun'
const outputFile = `${libraryName}.js`


const outputDir = path.join(__dirname, '/lib')

let config = {
  mode: (process.env.NODE_ENV || 'development'),
  entry: {
    [libraryName]: path.join(__dirname, '/index.js'),
    [`${libraryName}.min`]: path.join(__dirname, '/index.js')
  },
  devtool: 'source-map',
  output: {
    path: outputDir,
    filename: '[name].js',
    library: 'asyncIsFun',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDir]),
    new UglifyJSPlugin({
      sourceMap: true,
      include: /\.min\.js$/,
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {loader: 'babel-loader'},
          {loader: 'eslint-loader'},
        ]
      }
    ]
  },
};

module.exports = config;