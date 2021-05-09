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
const jwtInst = require("../../../middlewares/jwt");
const postRegister = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = ctx.request.body;
    const users = yield ctx.app.people.find({ username: username }).toArray();
    const userExist = users.some((elem) => elem.username === username);
    if (username !== '' && password !== '') {
        if (userExist) {
            ctx.conflict('Username already in use');
        }
        else {
            ctx.status = 201;
            yield ctx.app.people.insertOne(ctx.request.body);
            const user = yield ctx.app.people
                .find({ username: username, password: password })
                .toArray();
            ctx.body = {
                token: jwtInst.issue({
                    user: user[0]
                })
            };
        }
    }
    else {
        ctx.badRequest('Username or password cannot be empty');
    }
});
exports.default = () => postRegister;
