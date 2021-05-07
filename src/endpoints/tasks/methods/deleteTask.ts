import { ObjectID } from 'mongodb'
import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext, Middleware } from 'koa'
import { IJwt } from '../../../common/types'

const deleteTask = async (ctx: DefaultContext): Promise<void> => {
  const documentQuery = { _id: new ObjectID(ctx.params.id) }
  const headers = ctx.request.header
  const jwt = <IJwt>jsonwebtoken.decode(headers.authorization.slice(7))
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
    ctx.forbidden()
  }
}

export default (): Middleware => deleteTask
