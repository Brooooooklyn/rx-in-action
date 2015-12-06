/* global process */

const gulp        = require('gulp')
const rename      = require('gulp-rename')
const concat      = require('gulp-concat')
const sequence    = require('gulp-sequence')
const browserify  = require('browserify')
const tsify       = require('tsify')
const browserSync = require('browser-sync')
const reload      = browserSync.reload

gulp.task('compile', () => {
  return browserify()
    .add('src/app.ts')
    .plugin(tsify, { noImplicitAny: true })
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(process.stdout)
})


gulp.task('default', sequence('compile'))
