import readline from 'node:readline/promises'
import connectMongoose from "./lib/connectMongoose.js"
import Agent from "./models/Agent.js"
import User from './models/User.js'

const connection = await connectMongoose()
console.log('Connected to MongoDB') 

const answer = await ask('Are you sure you want to delete database collections? (n)')
if (answer.toLowerCase() !== 'y'){
    console.log('Operation aborted')
    process.exit(0)
}

await initAgent()
await initUsers()
await connection.close()

async function initAgent() {
    //delete all agents
    const result = await Agent.deleteMany()
    console.log(`Deleted ${result.deletedCount} agents.`)

    //create agents 
    const insertResult = await Agent.insertMany([
        {name: 'Smith', age: 45},
        {name: 'Brown', age: 33},
        {name: 'Jones', age: 24},
    ])
    console.log(`Inserted ${insertResult.length} agents.`)
}
async function initUsers() {
    //delete all users
    const result = await User.deleteMany()
    console.log(`Deleted ${result.deletedCount} users.`)

    //create users
    const insertResult = await User.insertMany([
        {email: 'admin@example.com', password: await User.hashPassword ('1234')},
        {email: 'user@example.com', password: await User.hashPassword ('1234')},
    ])
    console.log(`Inserted ${insertResult.length} users.`)
}


async function ask(question) {
   const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
   })
   const result = await rl.question(question)
   rl.close()
   return result
}