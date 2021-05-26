import * as Router from 'koa-router'
import * as jwt from '../../middlewares/jwt'
import postCollection from './methods/postCollection'

export const collectionsRouter = new Router({ prefix: '/collections' })

collectionsRouter.use(jwt.errorHandler()).use(jwt.jwtInst())

// collectionsRouter.get('/', getCollections())

collectionsRouter.post('/', postCollection())

// collectionsRouter.put('/:id', putCollections())

// collectionsRouter.delete('/:id', deleteCollection())
