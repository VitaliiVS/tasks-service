import * as Router from 'koa-router'
import postAuth from './methods/postAuth'

export const authRouter = new Router({ prefix: '/auth' })

authRouter.post('/', postAuth())
