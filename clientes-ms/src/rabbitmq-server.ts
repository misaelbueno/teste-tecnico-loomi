import { Channel, Connection, connect } from 'amqplib'

export default class RabbitmqServer {
  private conn: Connection
  private channel: Channel

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri)
    this.channel = await this.conn.createChannel()
    await this.channel.assertQueue('transaction')

    console.log('CONNECTED WHIT RABBITMQ')
  }

  consumerMessage() {
    this.channel.consume('transaction', async (message) => {
      if (message) {
        const msgParse = JSON.parse(message?.content.toString())
        this.channel.ack(message)

        console.log('MESSAGE RECEIVED', msgParse)
      }
    })
  }
}
