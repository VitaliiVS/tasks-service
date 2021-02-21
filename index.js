const Koa = require('koa')
const cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

const regiterRouter = require('./register')
const authRouter = require('./auth')
const tasksRouter = require('./tasks')

const app = new Koa()

require('./mongo')(app)

app.use(cors())
app.use(logger())
app.use(BodyParser())
app.use(regiterRouter.routes()).use(regiterRouter.allowedMethods())
app.use(authRouter.routes()).use(authRouter.allowedMethods())
app.use(tasksRouter.routes()).use(tasksRouter.allowedMethods())

app.listen(3000)