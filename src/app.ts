import * as rx from 'rxjs-es/Rx'
import {apiHost} from './config'

export default fetch(`${apiHost}/users/me`).then((data) => {
  console.log(data)
})
