const NodeEnvironment = require('jest-environment-node')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const unlink = util.promisify(require('fs').unlink)
const prismaBinary = './node_modules/.bin/prisma'

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
    this.databaseUrl = `${__dirname}/__test.db`
  }

  async setup() {
    // Set the required environment variable to contain the connection string
    // to our database test schema
    process.env.DATABASE_URL = `file:${this.databaseUrl}`
    this.global.process.env.DATABASE_URL = `file:${this.databaseUrl}`
    // Run the migrations to ensure our schema has the required structure
    await exec(`${prismaBinary} migrate up --create-db --experimental`)
    await exec('yarn seed')
    return super.setup()
  }

  async teardown() {
    await unlink(this.databaseUrl)
  }
}

module.exports = PrismaTestEnvironment