import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../../config/database";
import { env } from "../../config/env";
import { sendSuccess, sendError, sendServerError } from "../../utils/response";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// POST /api/admin/login
authRouter.post("/login", async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Email ou mot de passe invalide", 422);
  }

  try {
    const { email, password } = parsed.data;
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return sendError(res, "Identifiants incorrects", 401);

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return sendError(res, "Identifiants incorrects", 401);

    const token = jwt.sign({ sub: admin.id }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });

    return sendSuccess(res, { token, email: admin.email });
  } catch (err) {
    return sendServerError(res, err);
  }
});

// GET /api/admin/me  — verify token
authRouter.get("/me", async (req: Request, res: Response) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return sendError(res, "Non autorisé", 401);
  try {
    const payload = jwt.verify(header.slice(7), env.JWT_SECRET) as { sub: string };
    const admin = await prisma.admin.findUnique({ where: { id: payload.sub }, select: { id: true, email: true } });
    if (!admin) return sendError(res, "Non autorisé", 401);
    return sendSuccess(res, admin);
  } catch {
    return sendError(res, "Token invalide", 401);
  }
});
