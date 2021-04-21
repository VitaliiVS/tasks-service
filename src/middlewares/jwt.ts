import * as jwt from 'koa-jwt'
import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext } from 'koa'

const SECRET = 'test'
const jwtInstance = jwt({ secret: SECRET })
const jwtExpDate = '1h'

const JWTErrorHandler = (ctx: DefaultContext, next: any) =>
	next().catch((err: any) => {
		if (401 === err.status) {
			ctx.unauthorized(ctx)
		} else {
			throw err
		}
	})

export const jwtInst = () => jwtInstance
export const errorHandler = () => JWTErrorHandler
export const issue = (payload: any) => {
	return jsonwebtoken.sign({ payload }, SECRET, { expiresIn: jwtExpDate })
}
