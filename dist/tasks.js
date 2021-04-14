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
exports.tasksRouter = void 0;
const Router = require("koa-router");
const mongodb_1 = require("mongodb");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("./jwt");
exports.tasksRouter = new Router({ prefix: '/tasks' });
exports.tasksRouter.use(jwt.errorHandler()).use(jwt.jwtInst());
exports.tasksRouter.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = ctx.request.header;
    const jwt = jsonwebtoken.decode(headers.authorization.slice(7));
    const user = jwt.payload.user;
    ctx.status = 200;
    ctx.body = yield ctx.app.tasks
        .find({ createdBy: user.userId, isDeleted: false })
        .toArray();
}));
exports.tasksRouter.post('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.tasksRouter.put('/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(ctx.request.body).length === 0) {
        ctx.status = 400;
        ctx.body = { error: "Request body can't be empty" };
    }
    else if (ctx.request.body.taskLabel.trim().length === 0) {
        ctx.status = 400;
        ctx.body = { error: "Task title can't be empty" };
    }
    else {
        const documentQuery = { _id: mongodb_1.ObjectID(ctx.params.id) };
        const valuesToUpdate = { $set: ctx.request.body };
        const headers = ctx.request.header;
        const jwt = jsonwebtoken.decode(headers.authorization.slice(7));
        const user = jwt.payload.user;
        const task = yield ctx.app.tasks
            .find({ _id: mongodb_1.ObjectID(ctx.params.id) })
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
}));
exports.tasksRouter.get('/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = ctx.request.header;
    const jwt = jsonwebtoken.decode(headers.authorization.slice(7));
    const user = jwt.payload.user;
    const task = yield ctx.app.tasks
        .find({ _id: mongodb_1.ObjectID(ctx.params.id) })
        .toArray();
    if (user.userId === task[0].createdBy) {
        ctx.status = 200;
        ctx.body = yield ctx.app.tasks.findOne({ _id: mongodb_1.ObjectID(ctx.params.id) });
    }
    else {
        ctx.status = 403;
        ctx.body = { error: "User don't has sufficient privileges" };
    }
}));
exports.tasksRouter.delete('/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const documentQuery = { _id: mongodb_1.ObjectID(ctx.params.id) };
    const headers = ctx.request.header;
    const jwt = jsonwebtoken.decode(headers.authorization.slice(7));
    const user = jwt.payload.user;
    const task = yield ctx.app.tasks
        .find({ _id: mongodb_1.ObjectID(ctx.params.id) })
        .toArray();
    if (user.userId === task[0].createdBy) {
        yield ctx.app.tasks.updateOne(documentQuery, {
            $set: { isDeleted: true }
        });
        ctx.status = 200;
        ctx.body = yield ctx.app.tasks
            .find({ createdBy: user.userId, isDeleted: false })
            .toArray();
    }
    else {
        ctx.status = 403;
        ctx.body = { error: "User don't has sufficient privileges" };
    }
}));
