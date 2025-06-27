import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ConversionResult } from '@/components/ConversionResult';
import CurrencyForm from '@/components/CurrencyForm';
import { useConversion } from '@/hooks/useConversion';
import { useCurrencies } from '@/hooks/useCurrencies';
import { type FormSchema, formSchema } from '@/lib/formSchema';

export function CurrencyConverter() {
  const {
    data: currencies = [],
    isLoading: currenciesLoading,
    isError: currenciesError,
    error: currenciesErrorObj,
  } = useCurrencies();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: 1, fromCurrency: '', toCurrency: '' },
    mode: 'onChange',
  });

  useEffect(() => {
    if (currencies.length > 0) {
      if (!form.getValues('fromCurrency'))
        form.setValue('fromCurrency', currencies[0].short_code);
      if (!form.getValues('toCurrency') && currencies.length > 1)
        form.setValue('toCurrency', currencies[1].short_code);
    }
  }, [currencies, form.getValues, form.setValue]);

  const { fromCurrency, toCurrency, amount } = form.watch();

  // Find the selected 'to' currency for symbol display
  const toCurrencyObj = currencies.find((c) => c.short_code === toCurrency);

  const {
    data: converted,
    isLoading: conversionLoading,
    isError: conversionError,
    error: conversionErrorObj,
  } = useConversion(fromCurrency, toCurrency, amount);

  function getErrorMessage(): string | null {
    switch (true) {
      case currenciesError:
        return currenciesErrorObj?.message || 'Failed to load currencies';
      case conversionError:
        if (
          conversionErrorObj?.message?.includes('Malformed conversion response')
        ) {
          return 'Conversion failed: Please check your input and try again.';
        }
        if (conversionErrorObj?.message?.includes('API key')) {
          return 'API key is missing or invalid. Please check your configuration.';
        }
        return (
          conversionErrorObj?.message || 'Failed to convert. Please try again.'
        );
      default:
        return null;
    }
  }

  return (
    <div className="mx-auto max-w-md mt-10 rounded-xl bg-white p-8 shadow-lg dark:bg-zinc-900">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white mb-6 text-center">
        Currency Converter
      </h1>
      <CurrencyForm
        form={form}
        currencies={currencies}
        currenciesLoading={currenciesLoading}
        currenciesError={currenciesError}
      />
      <div className="mt-6">
        <ConversionResult
          loading={currenciesLoading || conversionLoading}
          error={getErrorMessage()}
          result={converted ?? null}
          toCurrencyCode={toCurrencyObj?.short_code || ''}
        />
      </div>
    </div>
  );
}
