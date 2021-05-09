import * as Router from 'koa-router'
import postRegister from './methods/postRegister'

export const regiterRouter = new Router({ prefix: '/register' })

regiterRouter.post('/', postRegister())
