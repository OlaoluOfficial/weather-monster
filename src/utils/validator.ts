import { z } from 'zod';

const citiesValidator = z
  .object({
    name: z.string(),
    longitude: z.number(),
    latitude: z.number(),
  })
  .strict();

const tempValidator = z
  .object({
    city_id: z.number(),
    max: z.number(),
    min: z.number(),
  })
  .strict();

const webhooksValidator = z
  .object({
    city_id: z.number(),
    callback_url: z.string().url(),
  })
  .strict();

export { citiesValidator, tempValidator, webhooksValidator };
