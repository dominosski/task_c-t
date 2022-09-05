import amqp, { Channel, Connection } from 'amqplib'

var channel: Channel, connection: Connection

connect()
async function connect(){
    try{
        const amqpServer = "amqp://localhost:5672"
        connection = await amqp.connect(amqpServer)
        channel = await connection.createChannel()
        await channel.assertQueue("personal-data")
    }catch(e){
        console.log(e)
        await channel.close()
        await connection.close()
    }
}



export const sendMessage = async (data: any ) => {
    await channel.sendToQueue("personal-data", Buffer.from(data))
}