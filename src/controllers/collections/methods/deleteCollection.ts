import { ObjectID } from 'mongodb'
import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext, Middleware } from 'koa'
import { IJwt } from '../../../common/types'

const deleteCollection = async (ctx: DefaultContext): Promise<void> => {
  const documentQuery = { _id: new ObjectID(ctx.params.id) }
  const headers = ctx.request.header
  const jwt = <IJwt>jsonwebtoken.decode(headers.authorization.slice(7))
  const user = jwt.payload.user
  const collection = await ctx.app.collections
    .find({ _id: new ObjectID(ctx.params.id) })
    .toArray()

  if (user.userId === collection[0].createdBy) {
    await ctx.app.collections.updateOne(documentQuery, {
      $set: { isDeleted: true }
    })
    await ctx.success({ createdBy: user.userId }) //add isDleted
  } else {
    ctx.forbidden()
  }
}

export default (): Middleware => deleteCollection
