const Router = require('koa-router')
const ObjectID = require('mongodb').ObjectID
const jsonwebtoken = require('jsonwebtoken')
const jwt = require('./jwt')

const router = new Router({ prefix: '/tasks' })

router.use(jwt.errorHandler()).use(jwt.jwt())

router.get('/', async (ctx) => {
    const userId = ctx.request.query.userId
    ctx.status = 200
    ctx.body = await ctx.app.tasks.find({ 'createdBy': userId, 'isDeleted': false }).toArray()
})

router.post('/', async (ctx) => {
    if (Object.keys(ctx.request.body).length !== 0) {
        const userId = ctx.request.body.createdBy
        await ctx.app.tasks.insertOne(ctx.request.body)
        ctx.status = 201
        ctx.body = await ctx.app.tasks.find({ 'createdBy': userId, 'isDeleted': false }).toArray()
    } else {
        ctx.status = 400
        ctx.body = { error: 'Body can\'t be empty' }
    }
})

router.put('/:id', async (ctx) => {
    if (Object.keys(ctx.request.body).length !== 0) {
        const documentQuery = { '_id': ObjectID(ctx.params.id) }
        const valuesToUpdate = { $set: ctx.request.body }
        const headers = ctx.request.header
        const user = jsonwebtoken.decode(headers.authorization.slice(7))
        const task = await ctx.app.tasks.find({ '_id': ObjectID(ctx.params.id) }).toArray()

        if (user.user.userId === task[0].createdBy) {
            await ctx.app.tasks.updateOne(documentQuery, valuesToUpdate)
            ctx.status = 200
            ctx.body = await ctx.app.tasks.find({ 'createdBy': user.user.userId, 'isDeleted': false }).toArray()
        } else {
            ctx.status = 403
            ctx.body = { error: 'User don\'t has sufficient privileges' }
        }
    } else {
        ctx.status = 400
        ctx.body = { error: 'Body can\'t be empty' }
    }
})

router.get('/:id', async (ctx) => {
    const headers = ctx.request.header
    const user = jsonwebtoken.decode(headers.authorization.slice(7))
    const task = await ctx.app.tasks.find({ '_id': ObjectID(ctx.params.id) }).toArray()

    if (user.user.userId === task[0].createdBy) {
        ctx.status = 200
        ctx.body = await ctx.app.tasks.findOne({ '_id': ObjectID(ctx.params.id) })
    } else {
        ctx.status = 403
        ctx.body = { error: 'User don\'t has sufficient privileges' }
    }
})

router.delete('/:id', async (ctx) => {
    const documentQuery = { '_id': ObjectID(ctx.params.id) }
    const headers = ctx.request.header
    const user = jsonwebtoken.decode(headers.authorization.slice(7))
    const task = await ctx.app.tasks.find({ '_id': ObjectID(ctx.params.id) }).toArray()

    if (user.user.userId === task[0].createdBy) {
        await ctx.app.tasks.deleteOne(documentQuery)
        ctx.status = 200
        ctx.body = await ctx.app.tasks.find({ 'createdBy': user.user.userId, 'isDeleted': false }).toArray()
    } else {
        ctx.status = 403
        ctx.body = { error: 'User don\'t has sufficient privileges' }
    }
})

module.exports = router