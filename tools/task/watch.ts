'use strict'

import bundle from './bundle'

bundle(true)
  .then(result => {
    console.log(result)
  })
  .catch(e => {
    console.error(e)
  })
