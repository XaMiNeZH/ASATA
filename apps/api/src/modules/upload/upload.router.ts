import { Router, Response } from 'express'
import multer, { MulterError } from 'multer'
import path from 'path'
import fs from 'fs'
import { requireAdmin, AuthRequest } from '../auth/auth.middleware'
import { sendSuccess, sendError } from '../../utils/response'

const uploadsDir = path.join(process.cwd(), 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) return cb(null, true)
    cb(new Error('Seuls les fichiers image sont acceptés'))
  },
})

export const uploadRouter = Router()

uploadRouter.post('/', requireAdmin, (req: AuthRequest, res: Response) => {
  upload.single('image')(req as any, res, (err) => {
    if (err instanceof MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') return sendError(res, 'Fichier trop volumineux (max 5 MB)', 422)
      return sendError(res, err.message, 422)
    }
    if (err) return sendError(res, (err as Error).message, 422)
    if (!req.file) return sendError(res, 'Aucun fichier reçu', 422)
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    return sendSuccess(res, { url })
  })
})
