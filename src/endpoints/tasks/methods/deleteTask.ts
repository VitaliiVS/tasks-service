import { ObjectID } from 'mongodb'
import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext } from 'koa'

export const deleteTask = async (ctx: DefaultContext) => {
	const documentQuery = { _id: new ObjectID(ctx.params.id) }
	const headers = ctx.request.header
	const jwt: any = jsonwebtoken.decode(headers.authorization.slice(7))
	const user = jwt.payload.user
	const task = await ctx.app.tasks
		.find({ _id: new ObjectID(ctx.params.id) })
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
		ctx.forbidden(ctx)
	}
}
