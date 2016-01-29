'use strict'
import * as gulp from 'gulp'
import * as watch from 'gulp-watch'
import * as ts from 'gulp-typescript'

const compile = ts({
  module: 'commonjs',
  target: 'es6',
  isolatedModules: true
})

gulp.task('compile', () => {
  return gulp.src('./src/**/*.ts')
    .pipe(compile)
    .pipe(gulp.dest('lib'))
})

gulp.task('watch', () => {
  watch('./src/**/*.ts')
  .pipe(compile)
  .pipe(gulp.dest('lib'))
})
