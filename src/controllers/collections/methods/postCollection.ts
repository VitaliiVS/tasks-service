import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext, Middleware } from 'koa'
import { IJwt } from '../../../common/types'

const postCollection = async (ctx: DefaultContext): Promise<void> => {
  const { body, header } = ctx.request

  if (Object.keys(body).length === 0) {
    ctx.badRequest("Request body can't be empty")
  } else if (!body.collectionName && body.collectionName.trim().length === 0) {
    ctx.badRequest("Collection name can't be empty")
  } else {
    const headers = header
    const jwt = <IJwt>jsonwebtoken.decode(headers.authorization.slice(7))
    const user = jwt.payload.user
    const collection = body
    collection.createdBy = user.userId

    await ctx.app.collections.insertOne(collection)
    await ctx.success({ createdBy: user.userId }, 201) //add isDleted
  }
}

export default (): Middleware => postCollection
