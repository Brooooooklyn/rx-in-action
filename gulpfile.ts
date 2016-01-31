'use strict'
import * as gulp from 'gulp'
import bundle from './tools/gulp/bundle'

gulp.task('bundle', () => {
  return bundle()
})