import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib'
import fs from 'fs'

var channel: Channel, connection: Connection


export const gatherData = async function connect(){
    try{
        const amqpServer = "amqp://localhost:5672"
        connection = await amqp.connect(amqpServer)
        channel = await connection.createChannel()
        await channel.assertQueue("personal-data")

        channel.consume("personal-data", (data: ConsumeMessage | null) => {
            if(data){
                fs.appendFile('../TASK_C-T/apiData.txt', data.content + '\n', (err) => {
                    if(err) throw err
                })
                channel.ack(data)
                return data.content
            } 
        })
    }catch(e){
        console.log(e)
        await channel.close()
        await connection.close()
    }
}
gatherData()

export default gatherData