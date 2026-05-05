import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  DATABASE_URL:        z.string().min(1, 'DATABASE_URL is required'),
  PORT:                z.coerce.number().default(3001),
  NODE_ENV:            z.enum(['development', 'production', 'test']).default('development'),
  ALLOWED_ORIGINS:     z.string().default('http://localhost:5173'),
  RATE_LIMIT_MAX:      z.coerce.number().default(20),
  GMAIL_USER:          z.string().email().optional(),
  GMAIL_APP_PASSWORD:  z.string().optional(),
  CONTACT_RECEIVER:    z.string().email().default('asata.club@gmail.com'),
  JWT_SECRET:          z.string().min(16).default('asata_super_secret_jwt_key_change_in_production'),
  JWT_EXPIRES_IN:      z.string().default('7d'),
  ADMIN_EMAIL:         z.string().email().default('admin@asata.ma'),
  ADMIN_PASSWORD:      z.string().default('asata2024!'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌  Invalid environment variables:')
  console.error(parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsed.data
