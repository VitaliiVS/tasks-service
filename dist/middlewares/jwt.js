"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issue = exports.errorHandler = exports.jwtInst = void 0;
const jwt = require("koa-jwt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET = 'test';
const jwtInstance = jwt({ secret: SECRET });
const jwtExpDate = '1h';
const JWTErrorHandler = (ctx, next) => next().catch((err) => {
    if (401 === err.status) {
        ctx.unauthorized();
    }
    else {
        throw err;
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
