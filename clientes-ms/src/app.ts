import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/api/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    address: z.string(),
  })

  const { name, email, address } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      address,
    },
  })

  return reply.status(201).send()
})

app.get('/api/users/:userId', async (request, reply) => {
  const getUserParams = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = getUserParams.parse(request.params)

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  return reply.send(user)
})
