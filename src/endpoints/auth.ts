import * as Router from 'koa-router'
import * as jwtInst from '../middlewares/jwt'
import { DefaultContext } from 'koa'

export const authRouter = new Router({ prefix: '/auth' })

authRouter.post(
	'/',
	async (ctx: DefaultContext): Promise<void> => {
		const { username, password } = ctx.request.body
		const user = await ctx.app.people
			.find({ username: username, password: password })
			.toArray()

		if (user[0]) {
			if (
				user[0].username === username &&
				user[0].password === password
			) {
				ctx.body = {
					token: jwtInst.issue({
						user: user[0]
					})
				}
			}
		} else {
			ctx.badRequest('Invalid login or password')
		}
	}
)
