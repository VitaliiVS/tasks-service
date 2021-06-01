import * as Router from 'koa-router'
import * as jwt from '../../middlewares/jwt'
import getTasks from './methods/getAllTasks'
import postTasks from './methods/postTask'
import putTasks from './methods/putTask'
import getTaskById from './methods/getTaskById'
import deleteTask from './methods/deleteTask'

export const tasksRouter = new Router({ prefix: '/tasks' })

tasksRouter.use(jwt.errorHandler()).use(jwt.jwtInst())

tasksRouter.get('/', getTasks())

tasksRouter.post('/', postTasks())

tasksRouter.put('/:id', putTasks())

tasksRouter.get('/:id', getTaskById())

tasksRouter.delete('/:id', deleteTask())
