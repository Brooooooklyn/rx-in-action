'use strict'
import {forEach, assign} from './utils'

// require('isomorphic-fetch')

const apiPath = ['Version', 'Type', 'Id', 'Path1', 'Path2', 'Path3']

export interface IRestPaths {
  Version?: 'V2'
  Type: string
  Id?: string
  Path1?: string
  Path2?: string
  Path3?: string
  _boundToObjectId?: string
  fields?: string
  [index: string]: any
}

export class Fetch {

  private static opts: any = {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }

  private static apiHost = 'http://project.ci/api'

  public static setAPIHost(host: string) {
    Fetch.apiHost = host
  }

  public static setToken(token: string) {
    delete Fetch.opts.credentials
    Fetch.opts.headers['Authorization'] = `OAuth2 ${token}`
    Fetch.apiHost = 'http://api.project.ci'
  }

  get(paths: IRestPaths) {
    const url = this.buildURI(paths)
    return fetch(url, assign({
      method: 'get'
    }, Fetch.opts))
    .then(data => {
      return data.json()
    })
  }

  post(paths: IRestPaths, data?: any) {
    const url = this.buildURI(paths)
    return fetch(url, assign({
      method: 'post',
      body: JSON.stringify(data)
    }, Fetch.opts))
    .then(data => {
      return data.json()
    })
  }

  put(paths: IRestPaths, data?: any) {
    const url = this.buildURI(paths)
    return fetch(url, assign({
      method: 'put',
      body: JSON.stringify(data)
    }, Fetch.opts))
    .then(data => {
      return data.json()
    })
  }

  delete(paths: IRestPaths) {
    const url = this.buildURI(paths)
    return fetch(url, assign({
      method: 'delete'
    }, Fetch.opts))
    .then(data => {
      return data.json()
    })
  }

  private buildURI(path: IRestPaths, apiHost?: string) {
    let uris = []
    let querys = []
    forEach(path, (val: string, key: string) => {
      const position = apiPath.indexOf(key)
      if (position !== -1) {
        uris[position] = val
      }else {
        querys.push(`${key}=${val}`)
      }
    })
    const version = uris[0]
    if (typeof version !== 'undefined') {
      uris[0] = `/${version}`
    }
    let url = apiHost ? apiHost + uris.join('/') : Fetch.apiHost + uris.join('/')
    url = querys.length ? url + '?' + querys.join('&') : url
    return url
  }
}
