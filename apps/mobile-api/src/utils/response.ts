import { Response } from 'express'

export const ok = (res: Response, data: unknown, message = 'Succès') =>
  res.status(200).json({ success: true, message, data })

export const created = (res: Response, data: unknown, message = 'Créé') =>
  res.status(201).json({ success: true, message, data })

export const badRequest = (res: Response, message: string) =>
  res.status(400).json({ success: false, message })

export const unauthorized = (res: Response, message = 'Non autorisé') =>
  res.status(401).json({ success: false, message })

export const forbidden = (res: Response, message = 'Accès refusé') =>
  res.status(403).json({ success: false, message })

export const notFound = (res: Response, message = 'Introuvable') =>
  res.status(404).json({ success: false, message })

export const conflict = (res: Response, message: string) =>
  res.status(409).json({ success: false, message })

export const serverError = (res: Response, message = 'Erreur interne') =>
  res.status(500).json({ success: false, message })
