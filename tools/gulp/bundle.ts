'use strict'
import * as gulp from 'gulp'
import * as gutil from 'gulp-util'
import webpackConfig from '../../webpack.config'

const webpack = require('webpack')

export default (minify?: boolean) => {
  if (minify) {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      }
    }))
  }
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, status) => {
      if (err) {
        throw new gutil.PluginError('webpack', err)
      }
      gutil.log(gutil.colors.cyan('[webpack]', status.toString()))
      resolve()
    })
  })
}
