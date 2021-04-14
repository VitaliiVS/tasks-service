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
exports.postTasks = void 0;
const jsonwebtoken = require("jsonwebtoken");
const postTasks = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(ctx.request.body).length === 0) {
        ctx.status = 400;
        ctx.body = { error: "Request body can't be empty" };
    }
    else if (ctx.request.body.taskLabel.trim().length === 0) {
        ctx.status = 400;
        ctx.body = { error: "Task title can't be empty" };
    }
    else {
        const headers = ctx.request.header;
        const jwt = jsonwebtoken.decode(headers.authorization.slice(7));
        const user = jwt.payload.user;
        const task = ctx.request.body;
        task.createdBy = user.userId;
        yield ctx.app.tasks.insertOne(task);
        ctx.status = 201;
        ctx.body = yield ctx.app.tasks
            .find({ createdBy: user.userId, isDeleted: false })
            .toArray();
    }
});
exports.postTasks = postTasks;
