import * as Koa from 'koa'
import * as cors from '@koa/cors'
import * as BodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'

import { regiterRouter } from './register'
import { authRouter } from './auth'
import { tasksRouter } from './tasks/tasks'
import mongo from './mongo'

const app = new Koa()

mongo(app)

app.use(cors())
app.use(logger())
app.use(BodyParser())
app.use(regiterRouter.routes()).use(regiterRouter.allowedMethods())
app.use(authRouter.routes()).use(authRouter.allowedMethods())
app.use(tasksRouter.routes()).use(tasksRouter.allowedMethods())

app.listen(3000)
