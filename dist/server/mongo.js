"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const assert = require("assert");
const dotenv = require("dotenv");
dotenv.config();
const dbName = 'db';
const tasks = 'tasks';
const people = 'people';
const collections = 'collections';
const mongoUri = process.env.DB_URI_DEV;
exports.default = (app) => {
    const client = new mongodb_1.MongoClient(mongoUri, { useUnifiedTopology: true });
    client.connect((err) => {
        assert.strictEqual(null, err);
        const db = client.db(dbName);
        app.tasks = db.collection(tasks);
        app.people = db.collection(people);
        app.collections = db.collection(collections);
        console.log('Connected successfully to server');
    });
};
