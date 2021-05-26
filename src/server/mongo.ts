import { MongoClient } from 'mongodb'
import * as assert from 'assert'
import * as dotenv from 'dotenv'
import { IApp } from '../common/types'

dotenv.config()

const dbName = 'db'
const tasks = 'tasks'
const people = 'people'
const collections = 'collections'
const mongoUri = process.env.DB_URI_PROD as string

export default (app: IApp): void => {
  const client = new MongoClient(mongoUri, { useUnifiedTopology: true })

  client.connect((err) => {
    assert.strictEqual(null, err)

    const db = client.db(dbName)

    app.tasks = db.collection(tasks)
    app.people = db.collection(people)
    app.collections = db.collection(collections)

    console.log('Connected successfully to server')
  })
}
