import express from 'express' //ESM Ecmascript Modules
import router from './router'
const app = express()

// Leer datos de formularios

app.use(express.json())

app.use('/', router)

export default app