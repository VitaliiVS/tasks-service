import * as Router from 'koa-router'
import * as jwtInst from './jwt'

export const regiterRouter = new Router({ prefix: '/register' })

regiterRouter.post('/', async (ctx: any) => {
	const { username, password } = ctx.request.body

	const users = await ctx.app.people.find({ username: username }).toArray()

	if (username !== '' && password !== '') {
		if (users.some((elem: any) => elem.username === username)) {
			ctx.status = 409
			ctx.body = { error: 'Username already in use' }
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
		ctx.status = 400
		ctx.body = { error: 'Username or password cannot be empty' }
	}
})
