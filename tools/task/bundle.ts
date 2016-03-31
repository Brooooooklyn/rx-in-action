'use strict'
import * as path from 'path'
const webpack =  require('webpack')

export default (watch?: boolean, minify?: boolean) => {
  return new Promise((resolve, reject) => {
    return webpack({
      entry: {
        app: [
          path.join(process.cwd(), 'src/index.ts')
        ]
      },
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
            test: /\.ts$/,
            loader: 'ts'
          }
        ]
      },
      plugins: [
        minify ? new webpack.optimize.UglifyJsPlugin({
          mangle: {
            except: ['$super', '$', 'exports', 'require']
          }
        }) : null
      ],
      watch: watch,
      devtool: 'source-map',
      ts: {
        configFileName: path.join(process.cwd(), 'tools/build/bundle.json'),
        silent: true
      }
    }, (err, status) => {
      if (err) reject(err)
      resolve(`[webpack], ${status.toString()}`)
    })
  })
}
