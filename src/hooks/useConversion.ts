import { useQuery } from '@tanstack/react-query';
import { convertCurrencyService } from '../services/currencyService';

export function useConversion(
  fromCurrency: string,
  toCurrency: string,
  amount: number,
) {
  return useQuery<number, Error>({
    queryKey: ['convert', fromCurrency, toCurrency, amount],
    enabled: Boolean(fromCurrency && toCurrency && amount),
    queryFn: () => convertCurrencyService(fromCurrency, toCurrency, amount),
  });
}
