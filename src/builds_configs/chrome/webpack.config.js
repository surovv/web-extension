const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nmPath = '../../../node_modules';

module.exports = {
  cache: true,

  entry: {
    bundle: __dirname + '/index', // will be  /build/chrome/bundle.js,
    background: __dirname + '/background'
  },
  output: {
    path: './build/chrome',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap')
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {from: __dirname + '/manifest.json'},
      {from: __dirname + '/logo.png'},
      {from: __dirname + '/echo.css'}
    ]),
    new ExtractTextPlugin('styles.css', {allChunks: true})
  ],

  noParse: [
    nmPath + '/react',
    nmPath + '/react-dom',
    nmPath + '/redux',
    nmPath + '/redux-thunk',
    nmPath + '/react-toolbox',
    nmPath + '/react-player',
    nmPath + 'lodash'
   ],

  stats: { children: false }

}
