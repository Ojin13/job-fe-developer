import { z } from 'zod'

export const customerFormSchema = z.object({
  name: z.string()
    .min(1, { message: 'Jméno je povinné' })
    .max(100, { message: 'Jméno nesmí být delší než 100 znaků' }),
  email: z.string()
    .min(1, { message: 'Email je povinný' })
    .email({ message: 'Neplatný formát emailu' }),
  phone: z.string()
    .optional()
    .transform(val => val || ''),
  address: z.string()
    .optional()
    .transform(val => val || ''),
})

export type CustomerFormData = z.infer<typeof customerFormSchema>
