import { z } from 'zod'

export const customerGroupFormSchema = z.object({
  name: z.string()
    .min(1, { message: 'Název je povinný' })
    .max(100, { message: 'Název nesmí být delší než 100 znaků' }),
  description: z.string()
    .optional()
    .transform(val => val || ''),
})

export type CustomerGroupFormData = z.infer<typeof customerGroupFormSchema>
