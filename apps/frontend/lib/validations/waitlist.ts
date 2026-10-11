import { z } from 'zod';

export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'waitlistInvalidEmail' })
    .email({ message: 'waitlistInvalidEmail' }),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
