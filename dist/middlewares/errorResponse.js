"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMethods = (ctx, next) => {
    const codeMap = {
        badRequest: {
            code: 400,
            message: { error: 'Bad request' }
        },
        unauthorized: {
            code: 401,
            message: { error: 'Not authorized' }
        },
        forbidden: {
            code: 403,
            message: { error: "User don't has sufficient privileges" }
        },
        notFound: {
            code: 404,
            message: { error: 'Not found' }
        },
        conflict: {
            code: 409,
            message: { error: 'Conflict' }
        }
    };
    for (const code in codeMap) {
        ctx[code] = (message) => {
            const body = message ? { error: message } : codeMap[code].message;
            ctx.status = codeMap[code].code;
            ctx.body = body;
            return ctx;
        };
    }
    return next();
};
exports.default = () => errorMethods;
