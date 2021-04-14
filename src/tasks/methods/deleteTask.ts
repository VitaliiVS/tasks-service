import { ObjectID } from 'mongodb'
import * as jsonwebtoken from 'jsonwebtoken'

export const deleteTask = async (ctx) => {
	const documentQuery = { _id: ObjectID(ctx.params.id) }
	const headers = ctx.request.header
	const jwt = jsonwebtoken.decode(headers.authorization.slice(7))
	const user = jwt.payload.user
	const task = await ctx.app.tasks
		.find({ _id: ObjectID(ctx.params.id) })
		.toArray()

	if (user.userId === task[0].createdBy) {
		await ctx.app.tasks.updateOne(documentQuery, {
			$set: { isDeleted: true }
		})
		ctx.status = 200
		ctx.body = await ctx.app.tasks
			.find({ createdBy: user.userId, isDeleted: false })
			.toArray()
	} else {
		ctx.status = 403
		ctx.body = { error: "User don't has sufficient privileges" }
	}
}
