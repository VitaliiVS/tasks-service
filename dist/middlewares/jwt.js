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
exports.issue = exports.errorHandler = exports.jwtInst = void 0;
const jwt = require("koa-jwt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET = 'test';
const jwtInstance = jwt({ secret: SECRET });
const jwtExpDate = '1h';
const JWTErrorHandler = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
    }
    catch (err) {
        if (401 === err.status) {
            ctx.unauthorized();
        }
        else {
            throw err;
        }
    }
});
const jwtInst = () => jwtInstance;
exports.jwtInst = jwtInst;
const errorHandler = () => JWTErrorHandler;
exports.errorHandler = errorHandler;
const issue = (payload) => {
    return jsonwebtoken.sign({ payload }, SECRET, { expiresIn: jwtExpDate });
};
exports.issue = issue;
