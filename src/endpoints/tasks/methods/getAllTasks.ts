import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext, Middleware } from 'koa'

const getTasks = async (ctx: DefaultContext): Promise<void> => {
	const headers = ctx.request.header
	const jwt: any = jsonwebtoken.decode(headers.authorization.slice(7))
	const user = jwt.payload.user

	ctx.status = 200
	ctx.body = await ctx.app.tasks
		.find({ createdBy: user.userId, isDeleted: false })
		.toArray()
}

export default (): Middleware => getTasks
