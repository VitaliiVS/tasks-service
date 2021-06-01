"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const Router = require("koa-router");
const postAuth_1 = require("./methods/postAuth");
exports.authRouter = new Router({ prefix: '/auth' });
exports.authRouter.post('/', postAuth_1.default());
