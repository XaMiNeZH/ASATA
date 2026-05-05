import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { env } from './config/env'
import { announcementsRouter } from './modules/announcements/announcements.router'
import { authRouter } from './modules/auth/auth.router'
import { eventsRouter } from './modules/events/events.router'
import { notificationsRouter } from './modules/notifications/notifications.router'
import { participationsRouter } from './modules/participations/participations.router'
import { profileRouter } from './modules/profile/profile.router'
import { errorHandler, notFoundHandler } from './middleware/error.middleware'

const app = express()
const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error(`Origin ${origin} not allowed by CORS`))
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.use(express.json({ limit: '10kb' }))

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Trop de requêtes. Réessayez dans 15 minutes.' },
})

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Trop de tentatives. Réessayez dans une heure.' },
})

app.use('/api', globalLimiter)
app.use('/api/auth', authLimiter)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRouter)
app.use('/api/events', eventsRouter)
app.use('/api/participations', participationsRouter)
app.use('/api/announcements', announcementsRouter)
app.use('/api/notifications', notificationsRouter)
app.use('/api/profile', profileRouter)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
