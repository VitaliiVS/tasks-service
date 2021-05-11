import { DefaultContext, Middleware } from 'koa'
import { IFilter } from '../common/types'

const successMethod = (ctx: DefaultContext, next: () => void): void => {
  ctx.success = async (
    filter: IFilter,
    status?: number
  ): Promise<DefaultContext> => {
    ctx.body = await ctx.app.tasks.find(filter).toArray()
    ctx.status = status || 200
    return ctx
  }

  return next()
}

export default (): Middleware<DefaultContext> => successMethod
