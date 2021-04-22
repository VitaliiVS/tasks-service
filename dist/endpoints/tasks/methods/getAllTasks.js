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
const jsonwebtoken = require("jsonwebtoken");
const getTasks = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = ctx.request.header;
    const jwt = jsonwebtoken.decode(headers.authorization.slice(7));
    const user = jwt.payload.user;
    ctx.status = 200;
    ctx.body = yield ctx.app.tasks
        .find({ createdBy: user.userId, isDeleted: false })
        .toArray();
});
exports.default = () => getTasks;
