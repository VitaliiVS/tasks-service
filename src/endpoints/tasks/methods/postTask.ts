import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext, Middleware } from 'koa'

const postTasks = async (ctx: DefaultContext): Promise<void> => {
  const { body, header } = ctx.request

  if (Object.keys(body).length === 0) {
    ctx.badRequest("Request body can't be empty")
  } else if (body.taskLabel.trim().length === 0) {
    ctx.badRequest("Task title can't be empty")
  } else {
    const headers = header
    const jwt: any = jsonwebtoken.decode(headers.authorization.slice(7))
    const user = jwt.payload.user
    const task = body
    task.createdBy = user.userId

    await ctx.app.tasks.insertOne(task)
    ctx.status = 201
    ctx.body = await ctx.app.tasks
      .find({ createdBy: user.userId, isDeleted: false })
      .toArray()
  }
}

export default (): Middleware => postTasks
