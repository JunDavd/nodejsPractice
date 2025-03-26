import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new Schema({
    email: {type : String, unique: true},
    password: String
})

//metodo del modelo
userSchema.statics.hashPassword = (clearPassword) => {
    return bcrypt.hash(clearPassword, 7)
}

//metodos de las instancias de usuario 
//en metodos de instancia no usamos arrow functions para no cambiar el this que pone mongoose 
userSchema.methods.comparePassword = function(clearPassword){
    //this ----> user (instancia del User)
    return bcrypt.compare(clearPassword, this.password)
    //arriba devuelve una promesa que se resuelve a boolean
}
const User = mongoose.model('User',userSchema)

export default User