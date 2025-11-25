import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        require: true, // Se vuelve obligatorio
        trim: true //elimina espacios innecesarios
    },

    email :{
        type: String,
        require: true, // Se vuelve obligatorio
        trim: true, //elimina espacios innecesarios
        unique: true // Se vuelve unico (No se puede repetir)
    },
    password:{
        type: String,
        require: true, // Se vuelve obligatorio
        trim: true //elimina espacios innecesarios
    }

    
})

const User = mongoose.model('User', userSchema)
export default User