import rateLimit from 'express-rate-limit'
import { env } from './env'

export const donationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: env.NODE_ENV === 'development' ? 500 : 10,
  message: { success: false, message: 'Limite de dons atteinte. Réessayez dans une heure.' },
})

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: env.NODE_ENV === 'development' ? 500 : 5,
  message: { success: false, message: 'Trop de messages envoyés. Réessayez dans une heure.' },
})
