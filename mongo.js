const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const mongoUri = 'mongodb://localhost:27017/'
const dbName = 'db'
const tasks = 'tasks'
const people = 'people'

module.exports = (app) => {
    const client = new MongoClient(mongoUri, { useUnifiedTopology: true })

    client.connect((err) => {
        assert.strictEqual(null, err)

        const db = client.db(dbName)

        app.tasks = db.collection(tasks)
        app.people = db.collection(people)

        console.log('Connected successfully to server')
    })
}