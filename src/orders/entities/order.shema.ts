import { z } from 'zod';

export const OrderMessageSchema = z.object({
  id: z.string().nonempty(),
  userId: z.number(),
  subjectId: z.string().nonempty(),
});
