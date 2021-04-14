"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const assert = require("assert");
// const mongoUri = 'mongodb://localhost:27017/'
const mongoUri = 'mongodb+srv://Braindamage93:Braindamage93@cluster0.krsnf.mongodb.net/db?retryWrites=true&w=majority';
const dbName = 'db';
const tasks = 'tasks';
const people = 'people';
exports.default = (app) => {
    const client = new mongodb_1.MongoClient(mongoUri, { useUnifiedTopology: true });
    client.connect((err) => {
        assert.strictEqual(null, err);
        const db = client.db(dbName);
        app.tasks = db.collection(tasks);
        app.people = db.collection(people);
        console.log('Connected successfully to server');
    });
};
