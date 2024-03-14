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

  async publishInQueue(queue: string, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message))
  }
}
