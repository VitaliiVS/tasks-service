import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext } from 'koa'

export const getTasks = async (ctx: DefaultContext) => {
	const headers = ctx.request.header
	const jwt: any = jsonwebtoken.decode(headers.authorization.slice(7))
	const user = jwt.payload.user

	ctx.status = 200
	ctx.body = await ctx.app.tasks
		.find({ createdBy: user.userId, isDeleted: false })
		.toArray()
}
