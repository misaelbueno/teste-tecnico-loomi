import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'
import RabbitmqServer from './rabbitmq-server'

export const app = fastify()

app.post('/api/transactions', async (request, reply) => {
  const server = new RabbitmqServer('amqp://admin:admin@localhost:5672')
  await server.start()
  await server.publishInQueue('transaction', JSON.stringify(request.body))

  const registerBodySchem = z.object({
    senderUserId: z.string(),
    receiverUserId: z.string(),
    amount: z.number(),
    description: z.string(),
  })

  const { senderUserId, receiverUserId, amount, description } =
    registerBodySchem.parse(request.body)

  await prisma.transaction.create({
    data: {
      senderUserId,
      receiverUserId,
      amount,
      description,
    },
  })

  return reply.status(201).send()
})
