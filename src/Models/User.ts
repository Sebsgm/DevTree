import mongoose, { Schema } from "mongoose";

interface IUser{
    handle: string,
    name: string,
    email: string,
    password: string
}

// El interface debe ser un espejo al Schema (Deben tener lo mismo)

const userSchema = new Schema({
    handle:{
        type: String,
        require: true, // Se vuelve obligatorio
        trim: true, //elimina espacios innecesarios
        lowercase: true,
        unique: true
    },
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

const User = mongoose.model<IUser>('User', userSchema) //Generics <User> Interface que se quiere utilizar
export default User