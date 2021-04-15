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
exports.putTasks = void 0;
const mongodb_1 = require("mongodb");
const jsonwebtoken = require("jsonwebtoken");
const putTasks = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, header } = ctx.request;
    if (Object.keys(body).length === 0) {
        ctx.status = 400;
        ctx.body = { error: "Request body can't be empty" };
    }
    else if (body.taskLabel.trim().length === 0) {
        ctx.status = 400;
        ctx.body = { error: "Task title can't be empty" };
    }
    else {
        const documentQuery = { _id: new mongodb_1.ObjectID(ctx.params.id) };
        const valuesToUpdate = { $set: body };
        const jwt = jsonwebtoken.decode(header.authorization.slice(7));
        const user = jwt.payload.user;
        const task = yield ctx.app.tasks
            .find({ _id: new mongodb_1.ObjectID(ctx.params.id) })
            .toArray();
        if (user.userId === task[0].createdBy) {
            yield ctx.app.tasks.updateOne(documentQuery, valuesToUpdate);
            ctx.status = 200;
            ctx.body = yield ctx.app.tasks
                .find({ createdBy: user.userId, isDeleted: false })
                .toArray();
        }
        else {
            ctx.status = 403;
            ctx.body = { error: "User don't has sufficient privileges" };
        }
    }
});
exports.putTasks = putTasks;
