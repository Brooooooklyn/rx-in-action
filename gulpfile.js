const gulp        = require('gulp');
const ts          = require('gulp-typescript');
const rename      = require('gulp-rename');
const concat      = require('gulp-concat');
const sequence    = require('gulp-sequence')
const browserSync = require('browser-sync');
const reload      = browserSync.reload;

gulp.task('compile', () => {
  return gulp.src('src/app.ts')
    .pipe(ts({
      'module': 'commonjs',
      'experimentalDecorators': true,
      'target': 'ES5'
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./www/js/'))
});

gulp.task('build-dep', () => {
  return gulp.src([
    'node_modules/@reactivex/rxjs/dist/global/Rx.js'
  ])
  .pipe(concat('lib.js'))
  .pipe(gulp.dest('www/js/'));
});


gulp.task('default', sequence('build-dep', 'compile'))
