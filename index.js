const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const ObjectID = require('mongodb').ObjectID
const jwt = require("./jwt")

const app = new Koa()
const router = new Router()
const securedRouter = new Router()

app.use(cors())
app.use(logger())
app.use(BodyParser())
require('./mongo')(app)
securedRouter.use(jwt.errorHandler()).use(jwt.jwt())

router.post("/auth", async (ctx) => {
    const requestUsername = ctx.request.body.username
    const requestPassword = ctx.request.body.password

    const user = await ctx.app.people.find({ "username": requestUsername, "password": requestPassword }).toArray()

    if (user[0]) {
        if (user[0].username === requestUsername && user[0].password === requestPassword) {
            ctx.body = {
                token: jwt.issue({
                    user: "user",
                    role: "user"
                })
            }
        }
    } else {
        ctx.status = 401
        ctx.body = { error: "Invalid login" }
    }
})

router.post("/register", async (ctx) => {
    const requestUsername = ctx.request.body.username

    const user = await ctx.app.people.find({ "username": requestUsername }).toArray()

    if (user.some(elem => elem.username === requestUsername)) {
        ctx.status = 409
        ctx.body = { error: "Username already in use" }
    } else {
        ctx.status = 201
        await ctx.app.people.insertOne(ctx.request.body)
    }
})

securedRouter.get('/tasks', async (ctx) => {
    ctx.status = 200
    ctx.body = await ctx.app.tasks.find({ 'isDeleted': false }).toArray()
})

securedRouter.post('/tasks', async (ctx) => {
    await ctx.app.tasks.insertOne(ctx.request.body)
    ctx.status = 201
    ctx.body = await ctx.app.tasks.find({ 'isDeleted': false }).toArray()
})

securedRouter.get('/tasks/:id', async (ctx) => {
    ctx.status = 200
    ctx.body = await ctx.app.tasks.findOne({ '_id': ObjectID(ctx.params.id) })
})

securedRouter.put('/tasks/:id', async (ctx) => {
    const documentQuery = { '_id': ObjectID(ctx.params.id) }
    const valuesToUpdate = { $set: ctx.request.body }
    await ctx.app.tasks.updateOne(documentQuery, valuesToUpdate)
    ctx.status = 200
    ctx.body = await ctx.app.tasks.find({ 'isDeleted': false }).toArray()
})

securedRouter.delete('/tasks/:id', async (ctx) => {
    const documentQuery = { '_id': ObjectID(ctx.params.id) }
    await ctx.app.tasks.deleteOne(documentQuery)
    ctx.status = 200
    ctx.body = await ctx.app.tasks.find({ 'isDeleted': false }).toArray()
})

app.use(router.routes()).use(router.allowedMethods())
app.use(securedRouter.routes()).use(securedRouter.allowedMethods())

app.listen(3000)