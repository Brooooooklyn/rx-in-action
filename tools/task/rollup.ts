'use strict'
import * as fs from 'fs'
import * as uglify from 'uglify-js'

const rollup  = require('rollup')
const babel   = require('rollup-plugin-babel')

rollup.rollup({
  entry: 'lib/es2015/app.js',
  plugins: [
    babel({
      presets: [ 'es2015-rollup' ]
    })
  ]
})
.then(bundle => {
  const code = bundle.generate({
    format: 'umd',
    moduleName: 'tbsdk'
  }).code

  const minified = uglify.minify(code, {
    fromString: true,
    output: <any>{
      ascii_only: true
    }
  }).code

  return write('dist/tbsdk.umd.js', minified)
})
.catch(e => console.error(e.stack))

function write (dest: string, code: string) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}

function getSize (code: string) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function blue (str: string) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
