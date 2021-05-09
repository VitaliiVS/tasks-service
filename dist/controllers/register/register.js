"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regiterRouter = void 0;
const Router = require("koa-router");
const postRegister_1 = require("./methods/postRegister");
exports.regiterRouter = new Router({ prefix: '/register' });
exports.regiterRouter.post('/', postRegister_1.default());
