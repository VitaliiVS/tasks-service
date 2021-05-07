import { ObjectID } from 'mongodb'
import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext, Middleware } from 'koa'
import { IJwt } from '../../../common/types'

const getTaskById = async (ctx: DefaultContext): Promise<void> => {
  const headers = ctx.request.header
  const jwt = <IJwt>jsonwebtoken.decode(headers.authorization.slice(7))
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
    ctx.forbidden()
  }
}

export default (): Middleware => getTaskById
