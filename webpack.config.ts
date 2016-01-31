'use strict'
import * as path from 'path'
import * as webpack from 'webpack'

const autoprefixer = require('autoprefixer')
const precss       = require('precss')
const cssImport    = require('postcss-import')

const imageName = 'images/[name].[ext]'

export default {
  entry: [
    path.join(process.cwd(), 'src/app.ts')
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.join(process.cwd(), 'www/')
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file',
        query: {
          name: imageName
        }
      },
      {
        test: /index\.html/,
        loader: 'file',
        query: {
          name: 'index.html'
        }
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss, cssImport({
      addDependencyTo: webpack
    })]
  },
  plugins: [],
  devtool: 'inline-source-map',
  ts: {
    configFileName: path.join(process.cwd(), 'tools/build/bundle.json'),
    silent: true
  }
}
