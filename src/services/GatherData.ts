import express from 'express'
import {connector} from '../routers/GatherData'

require('dotenv').config();

const port = process.env.GATHERDATA_PORT

const app = express()

app.use(express.json())
app.use(connector)

app.listen(port, () => {
    console.log('Server GatherData is running on port: ' + port)
})