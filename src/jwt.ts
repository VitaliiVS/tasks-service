import * as jwt from 'koa-jwt'
import * as jsonwebtoken from 'jsonwebtoken'

const SECRET = 'test'
const jwtInstance = jwt({ secret: SECRET })
const jwtExpDate = '1h'

const JWTErrorHandler = (ctx: any, next: any) =>
	next().catch((err: any) => {
		if (401 == err.status) {
			ctx.status = 401
			ctx.body = {
				error: 'Not authorized'
			}
		} else {
			throw err
		}
	})

export const jwtInst = () => jwtInstance
export const errorHandler = () => JWTErrorHandler
export const issue = (payload: any) => {
	return jsonwebtoken.sign({ payload }, SECRET, { expiresIn: jwtExpDate })
}
