import * as Koa from 'koa'
import * as cors from '@koa/cors'
import * as BodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'

import { regiterRouter } from './endpoints/register'
import { authRouter } from './endpoints/auth'
import { tasksRouter } from './endpoints/tasks/tasks'
import mongo from './mongo'
import errorMethods from './middlewares/errorResponse'

export const app = new Koa()

mongo(app)
app.use(errorMethods())
app.use(cors())
app.use(logger())
app.use(BodyParser())
app.use(regiterRouter.routes()).use(regiterRouter.allowedMethods())
app.use(authRouter.routes()).use(authRouter.allowedMethods())
app.use(tasksRouter.routes()).use(tasksRouter.allowedMethods())

app.listen(3000)
