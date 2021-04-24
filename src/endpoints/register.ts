import * as Router from 'koa-router'
import * as jwtInst from '../middlewares/jwt'
import { DefaultContext } from 'koa'

export const regiterRouter = new Router({ prefix: '/register' })

regiterRouter.post('/', async (ctx: DefaultContext) => {
	const { username, password } = ctx.request.body

	const users = await ctx.app.people.find({ username: username }).toArray()

	if (username !== '' && password !== '') {
		if (
			users.some(
				(elem: { username: string }) => elem.username === username
			)
		) {
			ctx.conflict('Username already in use')
		} else {
			ctx.status = 201
			await ctx.app.people.insertOne(ctx.request.body)
			const user = await ctx.app.people
				.find({ username: username, password: password })
				.toArray()
			ctx.body = {
				token: jwtInst.issue({
					user: user[0]
				})
			}
		}
	} else {
		ctx.badRequest('Username or password cannot be empty')
	}
})
