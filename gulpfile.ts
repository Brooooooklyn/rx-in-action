'use strict'
import * as gulp from 'gulp'
import bundle from './tools/gulp/bundle'
import server from './tools/gulp/serve'

gulp.task('bundle', () => {
  return bundle()
})

gulp.task('serve', () => {
  return server()
})
