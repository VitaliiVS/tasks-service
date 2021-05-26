import * as jsonwebtoken from 'jsonwebtoken'
import { DefaultContext, Middleware } from 'koa'
import { IJwt } from '../../../common/types'

const getCollections = async (ctx: DefaultContext): Promise<void> => {
  const headers = ctx.request.header
  const jwt = <IJwt>jsonwebtoken.decode(headers.authorization.slice(7))
  const user = jwt.payload.user

  await ctx.success({ createdBy: user.userId, isDeleted: false })
}

export default (): Middleware => getCollections
