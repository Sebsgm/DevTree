import mongoose, { Schema } from "mongoose";

interface IUser{
    name: string
    email: string,
    password: string
}

// El interface debe ser un espejo al Schema (Deben tener lo mismo)

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

const User = mongoose.model<IUser>('User', userSchema) //Generics <User> Interface que se quiere utilizar
export default User