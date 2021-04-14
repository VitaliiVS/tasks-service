import { MongoClient } from 'mongodb'
import * as assert from 'assert'

const mongoUri = 'mongodb://localhost:27017/'

const dbName = 'db'
const tasks = 'tasks'
const people = 'people'

export default (app) => {
	const client = new MongoClient(mongoUri, { useUnifiedTopology: true })

	client.connect((err) => {
		assert.strictEqual(null, err)

		const db = client.db(dbName)

		app.tasks = db.collection(tasks)
		app.people = db.collection(people)

		console.log('Connected successfully to server')
	})
}