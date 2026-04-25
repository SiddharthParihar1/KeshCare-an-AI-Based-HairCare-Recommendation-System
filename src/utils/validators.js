import { z } from 'zod';

export const assessmentSchema = z.object({
  hairType: z.string().min(1, 'Please select a hair type'),
  hairTexture: z.string().min(1, 'Please select a hair texture'),
  scalpCondition: z.string().min(1, 'Please select your scalp condition'),
  problems: z.array(z.string()).min(1, 'Pick at least one problem'),
  lifestyle: z.array(z.string()).optional(),
  washFrequency: z.string().min(1, 'Please select wash frequency'),
  waterType: z.string().min(1, 'Please select water type'),
  notes: z.string().max(500, 'Notes can be up to 500 characters').optional(),
});

export const stepValidators = {
  1: assessmentSchema.pick({ hairType: true, hairTexture: true }),
  2: assessmentSchema.pick({ scalpCondition: true }),
  3: assessmentSchema.pick({ problems: true }),
  4: assessmentSchema.pick({ washFrequency: true, waterType: true, notes: true }),
};
