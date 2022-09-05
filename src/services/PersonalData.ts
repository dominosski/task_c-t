import express from 'express'
import {router} from '../routers/PersonalData'

require('dotenv').config();

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log('Server is running on port: ' + port)
})

export default app