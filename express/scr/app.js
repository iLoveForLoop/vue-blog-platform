import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import profileRoutes from './routes/profileRoutes.js'
import testRoutes from './routes/testRoutes.js'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/', profileRoutes)
app.use('/', testRoutes)

export default app
