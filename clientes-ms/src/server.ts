import { app } from './app'
import { env } from './env'
import RabbitmqServer from './rabbitmq-server'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server is running')
  })

async function consumers() {
  const server = new RabbitmqServer('amqp://admin:admin@localhost:5672')
  await server.start()

  await server.consume('transaction', (message) => {
    console.log(message.content.toString())
  })
}

consumers()
