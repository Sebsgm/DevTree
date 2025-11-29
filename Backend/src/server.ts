import express from 'express' //ESM Ecmascript Modules
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { connectDB } from './Config/db'
import { corsConfig } from './Config/cors'

connectDB()


const app = express()

// Cors
app.use(cors(corsConfig))

// Leer datos de formularios
app.use(express.json())

app.use('/', router)

export default app