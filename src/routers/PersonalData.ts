import axios from 'axios'
import express from 'express'
export const router = express.Router()
import {validateId} from '../middleware/idValidation'
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
        const data = await axios.get(`https://gorest.co.in/public/v1/users?id=${userId}`, options)
        if(!data.data.data[0])
            return res.status(404).send()
        res.send(data.data.data[0])
    }catch(e){
        res.status(500).send()
    }
})
