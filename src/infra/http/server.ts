import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'

const server = fastify()

//registrar plugin de cors e deixar todas as portas abertas para o frontend acessar a api
server.register(fastifyCors, { origin: '*' })

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('Server is running on port 3333')
})
