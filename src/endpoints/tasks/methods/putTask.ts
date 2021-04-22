import { ObjectID } from 'mongodb'
import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext } from 'koa'

const putTasks = async (ctx: DefaultContext) => {
	const { body, header } = ctx.request

	if (Object.keys(body).length === 0) {
		ctx.badRequest(ctx, "Request body can't be empty")
	} else if (body.taskLabel.trim().length === 0) {
		ctx.badRequest(ctx, "Task title can't be empty")
	} else {
		const documentQuery = { _id: new ObjectID(ctx.params.id) }
		const valuesToUpdate = { $set: body }
		const jwt: any = jsonwebtoken.decode(header.authorization.slice(7))
		const user = jwt.payload.user
		const task = await ctx.app.tasks
			.find({ _id: new ObjectID(ctx.params.id) })
			.toArray()

		if (user.userId === task[0].createdBy) {
			await ctx.app.tasks.updateOne(documentQuery, valuesToUpdate)
			ctx.status = 200
			ctx.body = await ctx.app.tasks
				.find({ createdBy: user.userId, isDeleted: false })
				.toArray()
		} else {
			ctx.forbidden(ctx)
		}
	}
}

export default () => putTasks
