'use strict'
import * as gulp from 'gulp'
import * as gutil from 'gulp-util'
import webpackConfig from '../../webpack.config'

const webpack = require('webpack')

export const bundle = (minify?: boolean, cb?: Function) => {
  if (minify) {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      }
    }))
  }
  return webpack(webpackConfig, (err, status) => {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }
    gutil.log(gutil.colors.cyan('[webpack]', status.toString()))
    if (typeof cb === 'function') return cb()
  })
}

export default (minify?: boolean) => {
  return new Promise((resolve, reject) => {
    bundle(minify, resolve)
  })
}
