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
const jwt = require("../jwt");
const getAllTasks_1 = require("./methods/getAllTasks");
const postTask_1 = require("./methods/postTask");
const putTask_1 = require("./methods/putTask");
const getTaskById_1 = require("./methods/getTaskById");
const deleteTask_1 = require("./methods/deleteTask");
exports.tasksRouter = new Router({ prefix: '/tasks' });
exports.tasksRouter.use(jwt.errorHandler()).use(jwt.jwtInst());
exports.tasksRouter.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return getAllTasks_1.getTasks(ctx); }));
exports.tasksRouter.post('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return postTask_1.postTasks(ctx); }));
exports.tasksRouter.put('/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return putTask_1.putTasks(ctx); }));
exports.tasksRouter.get('/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return getTaskById_1.getTaskById(ctx); }));
exports.tasksRouter.delete('/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return deleteTask_1.deleteTask(ctx); }));
