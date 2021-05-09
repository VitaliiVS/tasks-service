import * as jwtInst from '../../../middlewares/jwt'
import { DefaultContext, Middleware } from 'koa'

const postRegister = async (ctx: DefaultContext): Promise<void> => {
  const { username, password } = ctx.request.body
  const users = await ctx.app.people.find({ username: username }).toArray()
  const userExist = users.some(
    (elem: { username: string }) => elem.username === username
  )

  if (username !== '' && password !== '') {
    if (userExist) {
      ctx.conflict('Username already in use')
    } else {
      ctx.status = 201
      await ctx.app.people.insertOne(ctx.request.body)
      const user = await ctx.app.people
        .find({ username: username, password: password })
        .toArray()
      ctx.body = {
        token: jwtInst.issue({
          user: user[0]
        })
      }
    }
  } else {
    ctx.badRequest('Username or password cannot be empty')
  }
}

export default (): Middleware => postRegister
