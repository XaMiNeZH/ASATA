import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { env } from './config/env'
import { donationsRouter } from './modules/donations/donations.router'
import { contactRouter }   from './modules/contact/contact.router'

const app = express()

// ── CORS ──────────────────────────────────────────────────────────────────────

const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map(o => o.trim())

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`Origin ${origin} not allowed by CORS`))
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// ── Body parsing ──────────────────────────────────────────────────────────────

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// ── Rate limiting ─────────────────────────────────────────────────────────────

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,        // 15 minutes
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Trop de requêtes. Réessayez dans 15 minutes.' },
})

// Stricter limiter for donation submission
const donationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,        // 1 hour
  max: 10,
  message: { success: false, message: 'Limite de dons atteinte. Réessayez dans une heure.' },
})

// Stricter limiter for contact form submission
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,        // 1 hour
  max: 5,
  message: { success: false, message: 'Trop de messages envoyés. Réessayez dans une heure.' },
})

app.use('/api', limiter)
app.use('/api/donations', donationLimiter)
app.use('/api/contact', contactLimiter)

// ── Health check ──────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: env.NODE_ENV, timestamp: new Date().toISOString() })
})

// ── Routes ────────────────────────────────────────────────────────────────────

app.use('/api/donations', donationsRouter)
app.use('/api/contact',   contactRouter)

// ── 404 handler ───────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route introuvable' })
})

// ── Global error handler ──────────────────────────────────────────────────────

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err.message)
  res.status(500).json({ success: false, message: 'Erreur interne du serveur' })
})

export default app
