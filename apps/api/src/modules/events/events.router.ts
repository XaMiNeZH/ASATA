import { Router, Request, Response } from "express";
import { prisma } from "../../config/database";
import { requireAdmin, AuthRequest } from "../auth/auth.middleware";
import { createEventSchema, updateEventSchema, listEventsQuerySchema } from "./events.schema";
import { sendSuccess, sendCreated, sendError, sendNotFound, sendServerError } from "../../utils/response";

export const eventsRouter = Router();

// ── GET /api/events — public ──────────────────────────────────────────────────
eventsRouter.get("/", async (req: Request, res: Response) => {
  const parsed = listEventsQuerySchema.safeParse(req.query);
  if (!parsed.success) return sendError(res, "Paramètres invalides", 422);

  try {
    const { status, sport } = parsed.data;
    const events = await prisma.event.findMany({
      where: {
        ...(status !== "all" ? { status } : {}),
        ...(sport  !== "all" ? { sport }  : {}),
      },
      orderBy: { date: "asc" },
    });
    return sendSuccess(res, events);
  } catch (err) {
    return sendServerError(res, err);
  }
});

// ── GET /api/events/:id — public ─────────────────────────────────────────────
eventsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findUnique({ where: { id: req.params.id } });
    if (!event) return sendNotFound(res, "Événement");
    return sendSuccess(res, event);
  } catch (err) {
    return sendServerError(res, err);
  }
});

// ── POST /api/events — admin only ─────────────────────────────────────────────
eventsRouter.post("/", requireAdmin, async (req: AuthRequest, res: Response) => {
  const parsed = createEventSchema.safeParse(req.body);
  if (!parsed.success) return sendError(res, "Données invalides", 422, parsed.error.flatten().fieldErrors);

  try {
    const event = await prisma.event.create({ data: parsed.data });
    return sendCreated(res, event, "Événement créé");
  } catch (err) {
    return sendServerError(res, err);
  }
});

// ── PUT /api/events/:id — admin only ─────────────────────────────────────────
eventsRouter.put("/:id", requireAdmin, async (req: AuthRequest, res: Response) => {
  const parsed = updateEventSchema.safeParse(req.body);
  if (!parsed.success) return sendError(res, "Données invalides", 422, parsed.error.flatten().fieldErrors);

  try {
    const exists = await prisma.event.findUnique({ where: { id: req.params.id } });
    if (!exists) return sendNotFound(res, "Événement");

    const event = await prisma.event.update({ where: { id: req.params.id }, data: parsed.data });
    return sendSuccess(res, event, "Événement mis à jour");
  } catch (err) {
    return sendServerError(res, err);
  }
});

// ── DELETE /api/events/:id — admin only ──────────────────────────────────────
eventsRouter.delete("/:id", requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const exists = await prisma.event.findUnique({ where: { id: req.params.id } });
    if (!exists) return sendNotFound(res, "Événement");

    await prisma.event.delete({ where: { id: req.params.id } });
    return sendSuccess(res, null, "Événement supprimé");
  } catch (err) {
    return sendServerError(res, err);
  }
});
