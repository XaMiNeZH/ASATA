import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { sendError } from "../../utils/response";

export interface AuthRequest extends Request {
  adminId?: string;
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return sendError(res, "Token manquant", 401);
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
    req.adminId = payload.sub;
    return next();
  } catch {
    return sendError(res, "Token invalide ou expiré", 401);
  }
}
