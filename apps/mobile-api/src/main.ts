import app from './app'
import { env } from './config/env'
import { prisma } from './config/database'

async function bootstrap(): Promise<void> {
  try {
    await prisma.$connect()
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }

  const server = app.listen(env.PORT, () => {
    console.log(`ASATA Connect API running on http://localhost:${env.PORT}`)
    console.log(`Environment: ${env.NODE_ENV}`)
  })

  const shutdown = (signal: string): void => {
    console.log(`${signal} received. Shutting down gracefully...`)
    server.close(() => {
      prisma.$disconnect()
        .then(() => {
          console.log('Server closed')
          process.exit(0)
        })
        .catch((error) => {
          console.error('Error during shutdown:', error)
          process.exit(1)
        })
    })
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error)
  process.exit(1)
})
