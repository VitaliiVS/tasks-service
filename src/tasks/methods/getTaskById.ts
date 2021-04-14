import { ObjectID } from 'mongodb'
import * as jsonwebtoken from 'jsonwebtoken'

export const getTaskById = async (ctx) => {
	const headers = ctx.request.header
	const jwt = jsonwebtoken.decode(headers.authorization.slice(7))
	const user = jwt.payload.user
	const task = await ctx.app.tasks
		.find({ _id: ObjectID(ctx.params.id) })
		.toArray()

	if (user.userId === task[0].createdBy) {
		ctx.status = 200
		ctx.body = await ctx.app.tasks.findOne({ _id: ObjectID(ctx.params.id) })
	} else {
		ctx.status = 403
		ctx.body = { error: "User don't has sufficient privileges" }
	}
}
