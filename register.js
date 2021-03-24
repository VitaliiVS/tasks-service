const Router = require('koa-router')
const jwt = require('./jwt')

const router = new Router({ prefix: '/register' })

router.post('/', async (ctx) => {
    const requestUsername = ctx.request.body.username
    const requestPassword = ctx.request.body.password

    const users = await ctx.app.people.find({ 'username': requestUsername }).toArray()

    if (requestUsername !== '' && requestPassword !== '') {
        if (users.some(elem => elem.username === requestUsername)) {
            ctx.status = 409
            ctx.body = { error: 'Username already in use' }
        } else {
            ctx.status = 201
            await ctx.app.people.insertOne(ctx.request.body)
            const user = await ctx.app.people.find({ 'username': requestUsername, 'password': requestPassword }).toArray()
            ctx.body = {
                token: jwt.issue({
                    user: user[0]
                })
            }
        }
    } else {
        ctx.status = 400
        ctx.body = { error: 'Username or password cannot be empty' }
    }
})

module.exports = router