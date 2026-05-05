import { z } from 'zod'

export const eventIdParamSchema = z.object({
  id: z.string().min(1),
})
