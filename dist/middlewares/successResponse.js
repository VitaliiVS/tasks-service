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
const successMethod = (ctx, next) => {
    ctx.success = (filter, status) => __awaiter(void 0, void 0, void 0, function* () {
        if (ctx.url === '/tasks') {
            ctx.body = yield ctx.app.tasks.find(filter).toArray();
        }
        else if (ctx.url === '/collections') {
            ctx.body = yield ctx.app.collections.find(filter).toArray();
        }
        ctx.status = status || 200;
        return ctx;
    });
    return next();
};
exports.default = () => successMethod;
