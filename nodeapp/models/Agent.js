import mongoose, { Schema } from "mongoose"

//definir el esquema de los agentes
const agentSchema = new Schema({
    name: String,
    age: {type: Number, min: 18, max: 130},
},{
    collection: 'agentes' //para forzar el nombre de la colección 
})

//crear el modelo
const Agent = mongoose.model('Agent', agentSchema)

export default Agent