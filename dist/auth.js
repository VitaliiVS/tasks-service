"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const Router = require("koa-router");
const jwtInst = require("./jwt");
exports.authRouter = new Router({ prefix: '/auth' });
exports.authRouter.post('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const requestUsername = ctx.request.body.username;
    const requestPassword = ctx.request.body.password;
    const user = yield ctx.app.people
        .find({ username: requestUsername, password: requestPassword })
        .toArray();
    if (user[0]) {
        if (user[0].username === requestUsername &&
            user[0].password === requestPassword) {
            ctx.body = {
                token: jwtInst.issue({
                    user: user[0]
                })
            };
        }
    }
    else {
        ctx.status = 401;
        ctx.body = { error: 'Invalid login or password' };
    }
}));
