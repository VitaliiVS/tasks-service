"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionsRouter = void 0;
const Router = require("koa-router");
const jwt = require("../../middlewares/jwt");
const postCollection_1 = require("./methods/postCollection");
exports.collectionsRouter = new Router({ prefix: '/collections' });
exports.collectionsRouter.use(jwt.errorHandler()).use(jwt.jwtInst());
// collectionsRouter.get('/', getCollections())
exports.collectionsRouter.post('/', postCollection_1.default());
// collectionsRouter.put('/:id', putCollections())
// collectionsRouter.delete('/:id', deleteCollection())
