import { z } from 'zod'

const clashItemSchema = z.object({
  data: z.number(),
  lvl: z.number().optional(),
  cnt: z.number().optional(),
  weapon: z.number().optional(),
  timer: z.number().optional(),
  gear_up: z.number().optional(),
  helper_cooldown: z.number().optional(),
})

export const clashDataSchema = z.object({
  tag: z.string(),
  timestamp: z.number(),
  helpers: z.array(clashItemSchema),
  buildings: z.array(clashItemSchema),
  traps: z.array(clashItemSchema),
  decos: z.array(clashItemSchema),
  obstacles: z.array(clashItemSchema),
  units: z.array(clashItemSchema),
  siege_machines: z.array(clashItemSchema),
  heroes: z.array(clashItemSchema),
  spells: z.array(clashItemSchema),
  pets: z.array(clashItemSchema),
  equipment: z.array(clashItemSchema),
  house_parts: z.array(z.number()),
  skins: z.array(z.number()),
  sceneries: z.array(z.number()),
  buildings2: z.array(clashItemSchema),
  traps2: z.array(clashItemSchema),
  decos2: z.array(clashItemSchema),
  obstacles2: z.array(clashItemSchema),
  units2: z.array(clashItemSchema),
  heroes2: z.array(clashItemSchema),
  skins2: z.array(z.number()),
  sceneries2: z.array(z.number()),
  boosts: z.record(z.string(), z.number()),
})

export type ClashData = z.infer<typeof clashDataSchema>
