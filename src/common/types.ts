import * as Koa from 'koa'
import { Collection } from 'mongodb'

export interface IApp extends Koa {
  tasks: Collection
  people: Collection
}

export interface IJwtPayload {
  user: {
    _id: string
    username: string
    password: string
    userId: string
  }
}

export interface IJwt {
  payload: IJwtPayload
}

export interface IcodeMap {
  [key: string]: {
    code: number
    message: {
      error: string
    }
  }
}
