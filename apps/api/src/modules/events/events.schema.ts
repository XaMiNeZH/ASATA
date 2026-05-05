import { z } from "zod";

const SPORTS    = ["ski", "football", "athletisme", "general"] as const;
const CATEGORIES = ["competition", "tournoi", "stage", "ceremonie", "rencontre"] as const;
const STATUSES  = ["upcoming", "past", "cancelled"] as const;

export const createEventSchema = z.object({
  title:          z.string().min(1).max(200),
  subtitle:       z.string().max(200).optional(),
  date:           z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format YYYY-MM-DD requis"),
  endDate:        z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  location:       z.string().min(1).max(200),
  locationDetail: z.string().max(300).optional(),
  sport:          z.enum(SPORTS),
  category:       z.enum(CATEGORIES),
  status:         z.enum(STATUSES),
  description:    z.string().min(1).max(2000),
  result:         z.string().max(300).optional(),
  highlight:      z.boolean().default(false),
  image:          z.string().max(500).optional(),
});

export const updateEventSchema = createEventSchema.partial();

export const listEventsQuerySchema = z.object({
  status:   z.enum([...STATUSES, "all"]).default("all"),
  sport:    z.enum([...SPORTS,   "all"]).default("all"),
});
