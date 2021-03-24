const Router = require('koa-router')
const jwt = require('./jwt')

const router = new Router({ prefix: '/auth' })

router.post('/', async (ctx) => {
    const requestUsername = ctx.request.body.username
    const requestPassword = ctx.request.body.password

    const user = await ctx.app.people.find({ 'username': requestUsername, 'password': requestPassword }).toArray()
    
    if (user[0]) {
        if (user[0].username === requestUsername && user[0].password === requestPassword) {
            ctx.body = {
                token: jwt.issue({
                    user: user[0]
                })
            }
        }
    } else {
        ctx.status = 401
        ctx.body = { error: 'Invalid login or password' }
    }
})

module.exports = router