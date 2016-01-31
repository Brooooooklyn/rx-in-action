import * as rx from 'rxjs-es/Rx'
import {apiHost} from './config'

require('./index.html')
require('../statics/images/logo-square.png')
require('../statics/images/logo-square@2x.png')

fetch(apiHost).then((data) => {
  console.log(data)
})
