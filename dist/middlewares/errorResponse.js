"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMethods = (ctx, next) => {
    const codeMap = {
        badRequest: 400,
        unauthorized: 401,
        forbidden: 403,
        notFound: 404,
        conflict: 409
    };
    for (const code in codeMap) {
        ctx[code] = (ctx, message) => {
            ctx.status = codeMap[code];
            ctx.body = { error: message };
            return ctx;
        };
    }
    return next();
};
exports.default = () => errorMethods;
