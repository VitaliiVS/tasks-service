import * as jwt from 'koa-jwt'
import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext, Middleware } from 'koa'
import { IJwtPayload } from '../common/types'

const SECRET = 'test'
const jwtInstance = jwt({ secret: SECRET })
const jwtExpDate = '1h'

const JWTErrorHandler = (ctx: DefaultContext, next: any) =>
  next().catch((err: any) => {
    if (401 === err.status) {
      ctx.unauthorized()
    } else {
      throw err
    }
  })

export const jwtInst = (): Middleware => jwtInstance
export const errorHandler = (): Middleware => JWTErrorHandler
export const issue = (payload: IJwtPayload) => {
  return jsonwebtoken.sign({ payload }, SECRET, { expiresIn: jwtExpDate })
}
