'use strict'
import * as Rx from 'rxjs'
import {Fetch} from './fetch'
import {token} from './config/index'

Fetch.setToken(token)

export const fetching = new Fetch()

const userMeObservable: Rx.Observable<string> = Rx.Observable.create((observer: Rx.Subscriber<string>) => {
  console.log('001')
  fetching.get({
    Type: 'users',
    Id: 'me'
  })
  .then(result => observer.next(result))
  .catch(err => observer.error(err))
})

const projectsObservable: Rx.Observable<string> = Rx.Observable.create((observer: Rx.Subscriber<string>) => {
  console.log('002')
  fetching.get({
    Type: 'projects'
  })
  .then(result => observer.next(result))
  .catch(err => observer.error(err))
})

Rx.Observable
  .merge(projectsObservable, userMeObservable)
  .subscribe(value => value)
