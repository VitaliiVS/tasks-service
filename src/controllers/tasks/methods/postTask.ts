import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext, Middleware } from 'koa'
import { IJwt } from '../../../common/types'

const postTasks = async (ctx: DefaultContext): Promise<void> => {
  const { body, header } = ctx.request

  if (Object.keys(body).length === 0) {
    ctx.badRequest("Request body can't be empty")
  } else if (body.taskLabel.trim().length === 0) {
    ctx.badRequest("Task title can't be empty")
  } else {
    const headers = header
    const jwt = <IJwt>jsonwebtoken.decode(headers.authorization.slice(7))
    const user = jwt.payload.user
    const task = body
    task.createdBy = user.userId

    await ctx.app.tasks.insertOne(task)
    await ctx.success({ createdBy: user.userId, isDeleted: false }, 201)
  }
}

export default (): Middleware => postTasks
