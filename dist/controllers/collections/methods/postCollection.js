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
const postCollection = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, header } = ctx.request;
    if (Object.keys(body).length === 0) {
        ctx.badRequest("Request body can't be empty");
    }
    else if (!body.collectionName && body.collectionName.trim().length === 0) {
        ctx.badRequest("Collection name can't be empty");
    }
    else {
        const headers = header;
        const jwt = jsonwebtoken.decode(headers.authorization.slice(7));
        const user = jwt.payload.user;
        const collection = body;
        collection.createdBy = user.userId;
        yield ctx.app.collections.insertOne(collection);
        yield ctx.success({ createdBy: user.userId }, 201); //add isDleted
    }
});
exports.default = () => postCollection;
