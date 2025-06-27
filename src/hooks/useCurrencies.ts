import { useQuery } from '@tanstack/react-query';
import {
  type Currency,
  fetchCurrenciesService,
} from '../services/currencyService';

export function useCurrencies() {
  return useQuery<Currency[], Error>({
    queryKey: ['currencies'],
    queryFn: fetchCurrenciesService,
    staleTime: Infinity,
  });
}
