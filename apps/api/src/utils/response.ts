import { Response } from 'express'

// ── Unified API response helpers ──────────────────────────────────────────────

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200,
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  })
}

export function sendCreated<T>(res: Response, data: T, message = 'Created') {
  return sendSuccess(res, data, message, 201)
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 400,
  errors?: unknown,
) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
  })
}

export function sendNotFound(res: Response, resource = 'Resource') {
  return sendError(res, `${resource} not found`, 404)
}

export function sendServerError(res: Response, err: unknown) {
  console.error(err)
  return sendError(res, 'Internal server error', 500)
}
