import amqp, { ConsumeMessage } from 'amqplib'
import fs from 'fs'

var channel: any, connection: any


export const gatherData = async function connect(){
    try{
        const amqpServer = "amqp://localhost:5672"
        connection = await amqp.connect(amqpServer)
        channel = await connection.createChannel()
        await channel.assertQueue("rabbitQueue")

        channel.consume("rabbitQueue", (data: ConsumeMessage) => {
            fs.appendFile('../TASK_C-T/apiData.txt', data.content + '\n', (err) => {
                if(err) throw err
            })

            channel.ack(data)

            return data.content
        })
    }catch(e){
        console.log(e)
        await channel.close()
        await connection.close()
    }
}
gatherData()

export default gatherData