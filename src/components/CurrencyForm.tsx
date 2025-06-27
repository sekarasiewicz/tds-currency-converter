import { ArrowUpDown } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { AmountInput } from '@/components/AmountInput';
import { CurrencySelector } from '@/components/CurrencySelector';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import type { FormSchema } from '@/lib/formSchema';
import type { Currency } from '@/services/currencyService';

type CurrencyFormProps = {
  form: UseFormReturn<FormSchema>;
  currencies: Currency[];
  currenciesLoading: boolean;
  currenciesError: boolean;
};

export default function CurrencyForm({
  form,
  currencies,
  currenciesLoading,
  currenciesError,
}: CurrencyFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="fromCurrency"
          render={({ field }) => (
            <CurrencySelector
              label="From:"
              options={currencies}
              disabled={currenciesLoading || currenciesError}
              field={field}
            />
          )}
        />
        <Button
          type="button"
          aria-label="Swap currencies"
          onClick={() => {
            const from = form.getValues('fromCurrency');
            const to = form.getValues('toCurrency');
            form.setValue('fromCurrency', to);
            form.setValue('toCurrency', from);
          }}
          disabled={currenciesLoading || currenciesError}
        >
          <ArrowUpDown className="w-6 h-6" />
        </Button>
        <FormField
          control={form.control}
          name="toCurrency"
          render={({ field }) => (
            <CurrencySelector
              label="To:"
              options={currencies}
              disabled={currenciesLoading || currenciesError}
              field={field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <AmountInput
              field={field}
              disabled={currenciesLoading || currenciesError}
            />
          )}
        />
      </form>
    </Form>
  );
}
