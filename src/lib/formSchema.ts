import { z } from 'zod';

export const formSchema = z.object({
  fromCurrency: z.string().min(1, { message: 'Select a currency' }),
  toCurrency: z.string().min(1, { message: 'Select a currency' }),
  amount: z
    .number({ invalid_type_error: 'Amount is required' })
    .min(0.01, { message: 'Amount must be at least 0.01' }),
});

export type FormSchema = z.infer<typeof formSchema>;
