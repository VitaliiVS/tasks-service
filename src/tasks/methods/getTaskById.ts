import { ObjectID } from 'mongodb'
import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext } from 'koa'

export const getTaskById = async (ctx: DefaultContext) => {
	const headers = ctx.request.header
	const jwt: any = jsonwebtoken.decode(headers.authorization.slice(7))
	const user = jwt.payload.user
	const task = await ctx.app.tasks
		.find({ _id: new ObjectID(ctx.params.id) })
		.toArray()

	if (user.userId === task[0].createdBy) {
		ctx.status = 200
		ctx.body = await ctx.app.tasks.findOne({
			_id: new ObjectID(ctx.params.id)
		})
	} else {
		ctx.status = 403
		ctx.body = { error: "User don't has sufficient privileges" }
	}
}
