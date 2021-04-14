import * as Router from 'koa-router'
import * as jwt from '../jwt'

import { getTasks } from './methods/getAllTasks'
import { postTasks } from './methods/postTask'
import { putTasks } from './methods/putTask'
import { getTaskById } from './methods/getTaskById'
import { deleteTask } from './methods/deleteTask'

export const tasksRouter = new Router({ prefix: '/tasks' })

tasksRouter.use(jwt.errorHandler()).use(jwt.jwtInst())

tasksRouter.get('/', async (ctx) => getTasks(ctx))

tasksRouter.post('/', async (ctx) => postTasks(ctx))

tasksRouter.put('/:id', async (ctx) => putTasks(ctx))

tasksRouter.get('/:id', async (ctx) => getTaskById(ctx))

tasksRouter.delete('/:id', async (ctx) => deleteTask(ctx))
