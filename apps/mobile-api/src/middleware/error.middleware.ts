import { NextFunction, Request, Response } from 'express'
import { serverError } from '../utils/response'

export class AppError extends Error {
  public readonly statusCode: number

  public constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({ success: false, message: 'Route introuvable' })
}

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message })
    return
  }

  if (err instanceof Error) {
    console.error('Unhandled error:', err.message)
  } else {
    console.error('Unhandled error:', err)
  }

  serverError(res, 'Erreur interne du serveur')
}
