import * as Router from 'koa-router'
import { ObjectID } from 'mongodb'
import * as jsonwebtoken from 'jsonwebtoken'
import * as jwt from './jwt'

export const tasksRouter = new Router({ prefix: '/tasks' })

tasksRouter.use(jwt.errorHandler()).use(jwt.jwtInst())

tasksRouter.get('/', async (ctx) => {
	const headers = ctx.request.header
	const jwt = jsonwebtoken.decode(headers.authorization.slice(7))
	const user = jwt.payload.user

	ctx.status = 200
	ctx.body = await ctx.app.tasks
		.find({ createdBy: user.userId, isDeleted: false })
		.toArray()
})

tasksRouter.post('/', async (ctx) => {
	if (Object.keys(ctx.request.body).length === 0) {
		ctx.status = 400
		ctx.body = { error: "Request body can't be empty" }
	} else if (ctx.request.body.taskLabel.trim().length === 0) {
		ctx.status = 400
		ctx.body = { error: "Task title can't be empty" }
	} else {
		const headers = ctx.request.header
		const jwt = jsonwebtoken.decode(headers.authorization.slice(7))
		const user = jwt.payload.user
		const task = ctx.request.body
		task.createdBy = user.userId

		await ctx.app.tasks.insertOne(task)
		ctx.status = 201
		ctx.body = await ctx.app.tasks
			.find({ createdBy: user.userId, isDeleted: false })
			.toArray()
	}
})

tasksRouter.put('/:id', async (ctx) => {
	if (Object.keys(ctx.request.body).length === 0) {
		ctx.status = 400
		ctx.body = { error: "Request body can't be empty" }
	} else if (ctx.request.body.taskLabel.trim().length === 0) {
		ctx.status = 400
		ctx.body = { error: "Task title can't be empty" }
	} else {
		const documentQuery = { _id: ObjectID(ctx.params.id) }
		const valuesToUpdate = { $set: ctx.request.body }
		const headers = ctx.request.header
		const jwt = jsonwebtoken.decode(headers.authorization.slice(7))
		const user = jwt.payload.user
		const task = await ctx.app.tasks
			.find({ _id: ObjectID(ctx.params.id) })
			.toArray()

		if (user.userId === task[0].createdBy) {
			await ctx.app.tasks.updateOne(documentQuery, valuesToUpdate)
			ctx.status = 200
			ctx.body = await ctx.app.tasks
				.find({ createdBy: user.userId, isDeleted: false })
				.toArray()
		} else {
			ctx.status = 403
			ctx.body = { error: "User don't has sufficient privileges" }
		}
	}
})

tasksRouter.get('/:id', async (ctx) => {
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
})

tasksRouter.delete('/:id', async (ctx) => {
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
})
