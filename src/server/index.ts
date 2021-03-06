import * as Koa from 'koa'
import * as cors from '@koa/cors'
import * as BodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'

import { regiterRouter } from '../controllers/register/register'
import { authRouter } from '../controllers/auth/auth'
import { tasksRouter } from '../controllers/tasks/tasks'
import { collectionsRouter } from '../controllers/collections/collections'
import mongo from './mongo'
import errorMethods from '../middlewares/errorResponse'
import successMethod from '../middlewares/successResponse'
import { IApp } from '../common/types'

export const app = new Koa() as IApp

mongo(app)
app.use(errorMethods())
app.use(successMethod())
app.use(cors())
app.use(logger())
app.use(BodyParser())
app.use(regiterRouter.routes()).use(regiterRouter.allowedMethods())
app.use(authRouter.routes()).use(authRouter.allowedMethods())
app.use(tasksRouter.routes()).use(tasksRouter.allowedMethods())
app.use(collectionsRouter.routes()).use(tasksRouter.allowedMethods())

app.listen(3000)
