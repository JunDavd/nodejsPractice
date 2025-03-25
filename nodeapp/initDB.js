import readline from 'node:readline/promises'
import connectMongoose from "./lib/connect/mongoose.js"
import Agent from "./models/Agent.js"

const connection = await connectMongoose()
console.log('Connected to MongoDB') 

const answer = await ask('Are you sure you want to delete database collections? (n)')
if (answer.toLowerCase() !== 'y'){
    console.log('Operation aborted')
    process.exit(0)
}

await initAgent()
await connection.close()

async function initAgent() {
    //delete all agents
    const result = await Agent.deleteMany()
    console.log(`Deleted ${result.deletedCount} agents.`)

    //create agents 
    const insterResult = await Agent.insertMany([
        {name: 'Smith', age: 45},
        {name: 'Brown', age: 33},
        {name: 'Jones', age: 24},
    ])
    console.log(`Inserted ${insterResult.length} agents.`)
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