import axios from 'axios'
import express from 'express'
export const router = express.Router()
import {validateId} from '../middleware/idValidation'
import {dataMapper} from '../mapper/PersonalDataMapper'
import {sendMessage} from '../routers/Rabbitmq'

require('dotenv').config();

type apiObject = {
    method: string,
    headers:  {'Authorization':string},
}

const options: apiObject = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${process.env.GOREST_ACCESS_TOKEN}`
    }
};

router.post('/api/v1/commands/run', validateId, async (req: any, res: any) => {
    const userId: number = req.body.id;
    try{
        const apiData = await axios.get(`https://gorest.co.in/public/v1/users?id=${userId}`, options)
        const data = apiData.data.data[0]
        if(!data)
            return res.status(404).send()
        const formattedData = dataMapper(data)
        console.log(formattedData)
        sendMessage(JSON.stringify(formattedData))
        res.send(formattedData)
    }catch(e){
        res.status(500).send()
    }
})
