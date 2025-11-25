import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)
        const url =`${connection.connection.host}:${connection.connection.port}`

        console.log(`MongoDB Conectado en ${url}`)
    }catch(error) {
        console.log(error.menssage)
        process.exit(1)
    }
}