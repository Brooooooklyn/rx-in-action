import {bundle} from './bundle'
import * as gutil from 'gulp-util'
import * as path from 'path'
const DevServer = require('webpack-dev-server')

export default () => {
  const serv = new DevServer(bundle(), {
    hot: true,
    publicPath: '/www/',
    stats: {
      colors: true
    }
  })

  serv.listen(8080, 'localhost', err => {
    if(err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log(gutil.colors.cyan('webpack-dev-server start'))
  })
}
