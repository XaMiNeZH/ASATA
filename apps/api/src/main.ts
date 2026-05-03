import app from './app'
import { env } from './config/env'
import { prisma } from './config/database'

async function bootstrap() {
  // Test database connection
  try {
    await prisma.$connect()
    console.log('✅  Database connected')
  } catch (err) {
    console.error('❌  Database connection failed:', err)
    process.exit(1)
  }

  // Start server
  const server = app.listen(env.PORT, () => {
    console.log(`🚀  ASATA API running on http://localhost:${env.PORT}`)
    console.log(`📦  Environment: ${env.NODE_ENV}`)
    console.log(`💳  Donations: http://localhost:${env.PORT}/api/donations`)
  })

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`\n⚠️   ${signal} received — shutting down gracefully...`)
    server.close(async () => {
      await prisma.$disconnect()
      console.log('👋  Server closed')
      process.exit(0)
    })
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT',  () => shutdown('SIGINT'))
}

bootstrap()
