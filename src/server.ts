import express from 'express' //ESM Ecmascript Modules
import 'dotenv/config'
import router from './router'
import { connectDB } from './Config/db'
const app = express()

connectDB()
// Leer datos de formularios

app.use(express.json())

app.use('/', router)

export default app